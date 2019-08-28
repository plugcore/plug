import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { DataModelFromDb } from '../models/data-models.model';

@Injectable({
	providedIn: 'root'
})
export class DataModelsService {

	data: DataModelFromDb[] = [
		{
			id: 1,
			name: 'Data Model de prueba 1',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			name: 'Data Model de prueba 2',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			name: 'Data Model de prueba 3',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			name: 'Data Model de prueba 4',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 5,
			name: 'Data Model de prueba 5',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 6,
			name: 'Data Model de prueba 6',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		}
	];

	public search(): Observable<ITablesResults<DataModelFromDb>> {

		const lenght = this.data.length;
		const result: ITablesResults<DataModelFromDb> = {
			data: this.data,
			total: lenght
		};
		return of(result);
	}

	public findById(id: number): Observable<DataModelFromDb> {
		const dataModel = this.data.find(dm => {
			return dm.id === id;
		});
		return of(dataModel);
	}

}

