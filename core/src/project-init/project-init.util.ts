import { isAbsolute, join } from 'path';
import { ConfigurationLoader } from '../configuration/configuration.loader';
import { ProjectConfigurationService } from '../configuration/configuration.service';
import { Container } from '../dependecy-injection/di.container';
import { DiUtils } from '../dependecy-injection/di.utils';
import { PublicEvents } from '../events/event.constants';
import { EventDispatcher } from '../events/event.dispatcher';
import { Logger } from '../logs/logger';
import { ObjectValidator } from '../object-validator/object-validator.service';

export class PorjectInitialization {

	private static readonly defaultConfigurationFolder = 'configuration';

	//
	// Public methods
	//

	/**
	 * Starts the application from the ground, creating all the minimal dependencies
	 * in the correct order. It takes as a parameter a folder from which it will lookup
	 * for a configuration folder to load it, and fire the required events.
	 */
	public static start(projectFolder: string, configurationFolder: string) {
		(async () => {

			// 1: Project configuration
			const cfg = await this.setConfiguration(configurationFolder);

			// 2: Check if we have to load additional projects
			if (cfg.init && cfg.init.additionalProjects) {
				await Promise.all(cfg.init.additionalProjects.map(async (addProject) => {
					if (addProject.module) {
						const moduleBase = require.resolve(addProject.module);
						await DiUtils.waitForFolder(
							join(moduleBase, addProject.path || '', '..'),
							true
						);
					} else if (addProject.path) {
						const baseFolder = isAbsolute(addProject.path) ? addProject.path : join(projectFolder, addProject.path);
						await DiUtils.waitForFolder(
							baseFolder,
							true
						);
					}
				}));
			}

			// 3: Load current project
			await DiUtils.waitForFolder(projectFolder, true);

		})().then(() => {
			// Project started
			Promise.all([
				Container.get<Logger>(Logger),
				Container.get<EventDispatcher>(EventDispatcher)
			]).then(deps => ({
				log: deps[0],
				eventDispatcher: deps[1]
			})).then(deps => {
				deps.eventDispatcher.emit(PublicEvents.allServicesLoaded);
				deps.log.info('* Project started *');
			});
		}).catch(error => {
			console.log('Faltal error on project initialization', error);
		});
	}

	//
	// Private methods
	//

	private static async setConfiguration(configurationFolder: string) {

		// Load configuration
		const currentEnv = process.env.NODE_ENV;
		if (!currentEnv) {
			process.env.NODE_ENV = 'dev';
		}
		const configuration = await ConfigurationLoader.loadProject(configurationFolder);
		const objectValidator = await Container.get(ObjectValidator);

		// Create configuration serice
		const configurationService = new ProjectConfigurationService(configuration, objectValidator, configurationFolder);

		// Add the configuratio to di container
		Container.set(ProjectConfigurationService, configurationService);

		return configurationService;

	}

}

