import { Configuration } from './configuration.interfaces';

export const defaultProjectConfiguration: Omit<Configuration, 'getConnectionConfiguration'> = {
	init: { distFolder: 'dist' },
	log: { },
	connections: {}
};
