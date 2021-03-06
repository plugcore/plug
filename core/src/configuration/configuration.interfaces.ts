import { LoggerOptions } from 'pino';
import { ClassParameter } from '../utils/typescript.utils';

export interface IAdditionalProject {
	module?: string;
	path?: string;
}

/**
 * Configuration for initialization tasks, such as start the process to load
 * all dependencies
 */
export interface IInitConfiguration {
	distFolder?: string;
	additionalProjects?: IAdditionalProject[];
}

export interface ConnectionConfiguration {
	type: string;
	[key: string]: any; // Any other property that we might need
}

/**
 * Plug framework configuration file
 */
export interface Configuration {

	init: IInitConfiguration;

	// Supported pino log configuration
	log: Partial<LoggerOptions>;

	// Connections object
	connections: Record<string, ConnectionConfiguration>;

	// Helper functions
	getConnectionConfiguration<T extends ConnectionConfiguration>(configurationClass: ClassParameter<T>, connection: string): T;

	// Returns the folder where all the configuration files are located, useful for realtive routes
	getConfigurationFolder(): string;

}
