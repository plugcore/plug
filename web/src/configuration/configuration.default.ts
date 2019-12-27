import { WebOasConfiguration } from './configuration.insterfaces';

export class WebConfiguration {

	public static readonly default =  {
		web: {
			server: {
				port: 3000,
				host: 'localhost'
			},
			oas: <WebOasConfiguration>{
				enableDocumentation: true,
				documentationPath: '/api-docs',
				info: <any>{},
				consumes: ['application/json'],
				produces: ['application/json'],
			}
		}
	};

}
