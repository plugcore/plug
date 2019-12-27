
export class WebConfiguration {

	public static readonly default =  {
		web: {
			server: {
				port: 3000,
				host: 'localhost'
			},
			oas: {
				enableDocumentation: true,
				documentationPath: '/api-docs',
				info: {},
				consumes: ['application/json'],
				produces: ['application/json'],
			}
		}
	};

}
