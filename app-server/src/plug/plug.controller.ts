
import { Controller, Get } from '@plugdata/web';

@Controller({ urlBase: '/plug' })
export class PlugController {

	constructor() {}

	@Get('/status')
	public async getPlugsStatus(): Promise<any> {
		const testData = [
			{
				id: 1,
				type: 'best-tours',
				name: 'Best tours',
				desc: 'Contains the services provided by "Best tours" to help buy them online',
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			},
			{
				id: 2,
				type: 'holiday-hotels',
				desc: 'Centralized API with the ability to book rooms from hundreds of hotels around the world',
				name: 'Holiday hotels',
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			},
			{
				id: 3,
				type: 'my-rentacar',
				name: 'My rentacar',
				desc: 'Helps with the process of renting a car connecting with multiples companies at all the airports',
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			},
			{
				id: 4,
				type: 'world-airlines',
				name: 'World airlines',
				desc: 'All the airlines centralized in a single API',
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			}
		];
		return {
			data: testData,
			total: testData.length
		};
	}

}
