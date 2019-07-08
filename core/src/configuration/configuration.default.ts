import { IConfiguration } from './configuration.interfaces';

export const defaultConfiguration = <IConfiguration<undefined>>{
	init: {
		distFolder: 'dist'
	}
};
