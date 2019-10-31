/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { join } from 'path';
import { ConfigurationLoader } from '../configuration/configuration.loader';
import { ProjectConfiguration } from '../configuration/configuration.service';
import { Container } from '../dependecy-injection/di.container';
import { DiUtils } from '../dependecy-injection/di.utils';
import { PublicEvents } from '../events/event.constants';
import { EventDispatcher } from '../events/event.dispatcher';
import { Logger } from '../logs/logger';

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
	public static start(projectFolder: string, configurationFolder?: string) {
		(async () => {
			// 1: Project configuration
			await this.setConfiguration(join(projectFolder, '..', '..', configurationFolder || this.defaultConfigurationFolder));
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
				deps.eventDispatcher.emmit(PublicEvents.allServicesLoaded);
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

		// Create configuration serice
		const configurationService = new ProjectConfiguration(configuration);

		// Add the configuratio to di container
		Container.set(ProjectConfiguration, configurationService);

	}

}

