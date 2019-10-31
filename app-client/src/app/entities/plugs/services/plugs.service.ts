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
			name: 'Plug de prueba 1',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			name: 'Plug de prueba 2',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			name: 'Plug de prueba 3',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			name: 'Plug de prueba 4',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 5,
			name: 'Plug de prueba 5',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 6,
			name: 'Plug de prueba 6',
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

