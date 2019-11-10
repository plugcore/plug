import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { PlugFromDb } from '../models/plugs.model';

@Injectable({
	providedIn: 'root'
})
export class PlugsService {

	data: PlugFromDb[] = [
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

	public search(): Observable<ITablesResults<PlugFromDb>> {

		const lenght = this.data.length;
		const result: ITablesResults<PlugFromDb> = {
			data: this.data,
			total: lenght
		};
		return of(result);
	}

	public findById(id: number): Observable<PlugFromDb> {
		const plug = this.data.find(p => {
			return p.id === id;
		});
		return of(plug);
	}
}

