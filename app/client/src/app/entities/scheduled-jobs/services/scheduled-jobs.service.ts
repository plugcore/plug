import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../components/table/interfaces/table.interface';
import { ScheduledJobFromDb } from '../models/scheduled-jobs.model';

@Injectable({
	providedIn: 'root'
})
export class ScheduledJobsService {

	data: ScheduledJobFromDb[] = [
		{
			id: 1,
			name: 'Scheduled Job de prueba 1',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			name: 'Scheduled Job de prueba 2',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			name: 'Scheduled Job de prueba 3',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			name: 'Scheduled Job de prueba 4',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 5,
			name: 'Scheduled Job de prueba 5',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 6,
			name: 'Scheduled Job de prueba 6',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		}
	];

	public search(): Observable<ITablesResults<ScheduledJobFromDb>> {

		const lenght = this.data.length;
		const result: ITablesResults<ScheduledJobFromDb> = {
			data: this.data,
			total: lenght
		};
		return of(result);
	}

	public findById(id: number): Observable<ScheduledJobFromDb> {
		const scheduledJob = this.data.find(sj => {
			return sj.id === id;
		});
		return of(scheduledJob);
	}

}

