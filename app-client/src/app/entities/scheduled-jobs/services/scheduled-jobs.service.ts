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
			name: 'Mail to users',
			cron: 'Every 6h',
			desc: 'Sends a mail with a remainder of incoming purchased tours to the selected users',
			nextExecution: new Date().getTime() + (6 * 60 * 60 * 1000),
			inputModel: {
				title: 'SelectedUsersForMail',
				type: 'object',
				properties:
				{
					users:
					{
						title: 'Users mails',
						type: 'array',
						items: {
							type: 'string'
						},
						uniqueItems: true
					}
				},
				required: ['users']
			}
		},
		{
			id: 2,
			name: 'Daily stats to direction',
			cron: 'Every day at 09:00',
			desc: 'Generates a report with all the relevant information about the day',
			nextExecution: new Date().getTime() + (12 * 60 * 60 * 1000)
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

