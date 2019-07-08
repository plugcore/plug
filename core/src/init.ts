import { join } from 'path';
import { ConfigurationLoader } from './configuration/configuration.loader';
import { Container } from './dependecy-injection/di.container';
import { ProjectConfiguration } from './configuration/configuration.service';
import { Logger } from './logs/logger';

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
	public static start(projectFolder: string) {
		(async () => {

			// 1: Project configuration
			await this.setConfiguration(join(projectFolder, this.defaultConfigurationFolder));

		})().then(() => {
			// Project started
			Container.get<Logger>(Logger).then(log => {
				log.info('* Project started *');
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
		const configuration = await ConfigurationLoader.loadProject(configurationFolder);

		// Create configuration serice
		const configurationService = new ProjectConfiguration(configuration);

		// Add the configuratio to di container
		Container.set(ProjectConfiguration, configurationService);

	}

}