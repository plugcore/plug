
export class WebConfiguration {

	public static readonly default =  {
		web: {
			server: {
				port: 3000,
				host: 'localhost'
			},
			oas: {
				info: {},
				consumes: ['application/json'],
				produces: ['application/json'],

			}
		}
	};

}
