import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { DatabaseFromDb } from '../models/databases.model';

@Injectable({
	providedIn: 'root'
})
export class DatabasesService {

	data: DatabaseFromDb[] = [
		{
			name: 'PGsrv01',
			desc: 'Postgres database for reservations',
			url: '51.68.70.189:5432/reservations_schema',
			type: 'Postgres',
			credentials: {
				user: 'reservationsUsr',
				password: '`XP)WMKk$4Q^u2N6'
			},
			extraSettings: {
				ssl: true,
				charset: 'UTF-8'
			},
			schemas: [
				{
					name: 'Reservation',
					url: '/data-models/documentation/reservation'
				}
			]
		},
		{
			name: 'MySQLsrv02',
			desc: 'Database to store user interaction logs',
			url: '213.99.21.245:3306/reservations_log',
			type: 'MySQL',
			credentials: {
				user: 'logsUser',
				password: '`:LmC-MTT68#4@npT'
			},
			extraSettings: {
				charset: 'UTF-8_general_ci',
				SSLMODE: true
			},
			schemas: [
				{
					name: 'Reservation log',
					url: '/data-models/documentation/reservation-log'
				}
			]
		},
		{
			name: 'MongoDbsrv03',
			desc: 'Plug core database',
			url: '213.32.21.15:27017',
			type: 'MongoDb',
			credentials: {
				user: 'plogcore',
				password: '`:LmC-MTT68#4@npT'
			},
			extraSettings: {
				loginDatabase: 'plugcore',
				schema: 'plugcore'
			},
			schemas: [
				{
					name: 'Log',
					url: '/data-models/documentation/plugcore-log'
				},
				{
					name: 'User',
					url: '/data-models/documentation/plugcore-user'
				},
				{
					name: 'Rol',
					url: '/data-models/documentation/plugcore-rol'
				},
				{
					name: 'Api token',
					url: '/data-models/documentation/plugcore-api-token'
				},
				{
					name: 'Api log',
					url: '/data-models/documentation/plugcore-api-log'
				}
			]
		}
	];

	public search(): Observable<ITablesResults<DatabaseFromDb>> {

		const lenght = this.data.length;
		const result: ITablesResults<DatabaseFromDb> = {
			data: this.data,
			total: lenght
		};
		return of(result);
	}

}

