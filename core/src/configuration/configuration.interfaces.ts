
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
export interface IConfiguration<T> {
	init: IInitConfiguration;
	// In this property we can add any custom configuration to the main configuration file
	// to exend it
	custom: T;
}
