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
			id: 1,
			name: 'Database de prueba 1',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			name: 'Database de prueba 2',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			name: 'Database de prueba 3',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			name: 'Database de prueba 4',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 5,
			name: 'Database de prueba 5',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 6,
			name: 'Database de prueba 6',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
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

