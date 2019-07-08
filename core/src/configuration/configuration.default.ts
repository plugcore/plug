import { IConfiguration } from './configuration.interfaces';

export class PlugConfiguration {

	public static readonly default: IConfiguration<undefined> = {
		init: {
			distFolder: 'dist'
		},
		custom: undefined
	};

}
