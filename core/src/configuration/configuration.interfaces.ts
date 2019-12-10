import { LoggerOptions } from 'pino';

/**
 * Configuration for initialization tasks, such as start the process to load
 * all dependencies
 */
export interface IInitConfiguration {
	distFolder: string;
}


/**
 * Plug framework configuration file
 */
export interface Configuration {
	init: IInitConfiguration;
	// Supported pino log configuration
	log: Pick<LoggerOptions,
	'level' | 'useLevelLabels' | 'changeLevelName' | 'redact' |
	'messageKey' | 'prettyPrint' | 'enabled' | 'base'
	> & { timestamp?: boolean };
}
