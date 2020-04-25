import { Configuration } from './configuration.interfaces';

export const defaultProjectConfiguration: Omit<Configuration, 'getConnectionConfiguration' | 'getConfigurationFolder'> = {
	init: { distFolder: 'dist' },
	log: { },
	connections: {}
};
