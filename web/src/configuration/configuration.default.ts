import { IWebConfiguration } from './configuration.insterfaces';

export class WebConfiguration {

	public static readonly default: IWebConfiguration = {
		web: {
			port: 3000
		}
	};

}
