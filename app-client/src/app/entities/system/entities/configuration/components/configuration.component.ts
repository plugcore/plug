import { Component } from '@angular/core';

@Component({
	selector: 'plug-system-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['./configuration.component.scss']
})
export class SystemConfigurationComponent {

	public customCfg: any = {
		holidayHotels: {
			endpoint: 'https://126.160.134.114/api/rooms',
			user: 'ssXIASgiOM',
			password: '!bdQ6&cbt3sJ'
		},
		myRentacar: {
			endpoint: 'https://205.195.7.24/ws/cars',
			token: '66dadeb2-ffba-47ca-8b5f-9cc0dc69b76e'
		},
		worldAirlines: {
			endpoint: 'https://209.54.149.93/c/api',
			user: 'RKIdUyeeaC',
			password: 'Cf%B2xp#5DVi'
		},
		bestTours: {
			endpoint: 'https://202.100.28.13/tours',
			user: 'hfqaVCUNTa',
			password: 'E#p%KQo*cDs%'
		}
	};

	public webCfg: any = {
		oas: {
			basePath: '/api',
			consumes: ['application/json'],
			host: 'vps5662933',
			produces:  ['application/json'],
			tags: [{
				name: 'tours',
				description: 'Tour methods'
			}, {
				name: 'reservations',
				description: 'Reservations methods'
			}],
			servers: [{
				url: 'vps5662933',
				description: 'Tours and reservations server',
				variables: {},
				addVariable: () => {}
			}]
		},
		server: {
			port: 3000,
			host: 'vps5662933',
			ipv6Only: false,
			path: '/api',
			exclusive: false
		}
	};

	public logCfg: any = {
		timestamp: true,
		base: {
			hostId: 'ovh2301'
		},
		enabled: true,
		level: 'debug',
		prettyPrint: false,
		useLevelLabels: false,
		messageKey: 'msg',
		changeLevelName: 'level',
		redact: ['email', 'user.password', 'user.email', '[*].email']
	};

	constructor(
	) {
	}

}
