import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { EventDetails, EventDetailsFromDb, EventFromDb, EventStatus } from '../models/event.model';

@Injectable({
	providedIn: 'root'
})
export class ScheduledJobsEventService {

	public jobTypeSelected = '0';

	private data: EventFromDb[] = [
		{
			id: 789,
			name: 'Daily stats to direction',
			status: EventStatus.SCHEDULED,
			jobType: '2',
			create_date: new Date().getTime() + (5 * 60 * 60 * 1000),
			create_user: 'System'
		},
		{
			id: 789,
			name: 'Mail to users',
			status: EventStatus.RUNNING,
			jobType: '1',
			create_date: new Date().getTime() + (1.9 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'8manhalofficial0@worldbibleschool.name',
						'vphenomene.su@sempuranadi.cf',
						'pfar@awer.icu',
						'ghair@fonsview.ml',
						'azakari@whatsmyspeed.info'
					]
				}
			}
		},
		{
			id: 788,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (6 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vapdhaliwal.77@dalamanporttransfer.xyz',
						'pfar@awer.icu',
						'ghair@fonsview.ml',
						'2paulo.pereira.8r@modety.online'
					]
				}
			}
		},
		{
			id: 787,
			name: 'Mail to users',
			status: EventStatus.FAILED,
			jobType: '1',
			create_date: new Date().getTime() - (12 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vphenomene.su@sempuranadi.cf',
						'pfar@awer.icu',
						'ghair@fonsview.ml',
						'azakari@whatsmyspeed.info',
						'a\'20asdf.ws'
					]
				},
				errors: [
					'User [6752] not found',
					'Invalid mail [a\'20asdf.ws]'
				]
			}
		},
		{
			id: 786,
			name: 'Daily stats to direction',
			status: EventStatus.COMPLETED,
			jobType: '2',
			create_date: new Date().getTime() - (12 * 60 * 60 * 1000),
			create_user: 'System'
		},
		{
			id: 785,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (18 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vphenomene.su@sempuranadi.cf',
						'pfar@awer.icu',
						'ghair@fonsview.ml',
						'azakari@whatsmyspeed.info'
					]
				}
			}
		},
		{
			id: 784,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (24 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vphenomene.su@sempuranadi.cf',
						'4pkvolv@cosmeticprocedure.org',
						'azakari@whatsmyspeed.info'
					]
				}
			}
		},
		{
			id: 783,
			name: 'Daily stats to direction',
			status: EventStatus.COMPLETED,
			jobType: '2',
			create_date: new Date().getTime() - (24 * 60 * 60 * 1000),
			create_user: 'System'
		},
		{
			id: 782,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (30 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vphenomene.su@sempuranadi.cf',
						'pfar@awer.icu',
						'ghair@fonsview.ml',
						'azakari@whatsmyspeed.info',
						'osamuel14_fernane@toplinewindow.com'
					]
				}
			}
		},
		{
			id: 781,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (36 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'ghair@fonsview.ml',
						'azakari@whatsmyspeed.info'
					]
				}
			}
		},
		{
			id: 780,
			name: 'Daily stats to direction',
			jobType: '2',
			status: EventStatus.COMPLETED,
			create_date: new Date().getTime() - (36 * 60 * 60 * 1000),
			create_user: 'System'
		},
		{
			id: 779,
			name: 'Mail to users',
			status: EventStatus.COMPLETED,
			jobType: '1',
			create_date: new Date().getTime() - (42 * 60 * 60 * 1000),
			create_user: 'System',
			eventDetails: {
				input: {
					users: [
						'vphenomene.su@sempuranadi.cf',
						'pfar@awer.icu',
						'azakari@whatsmyspeed.info'
					]
				}
			}
		}
	];

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<EventFromDb>> {

		const data = this.jobTypeSelected !== '0' ?
			this.data.filter(res => res.jobType === this.jobTypeSelected) : this.data;
		const lenght = data.length;
		this.applySort(data, activeSort, direction);
		const newData = this.applyPagination(data, pageIndex, pageSize);
		const result: ITablesResults<EventFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findById(id: number): Observable<EventFromDb> {
		const event = this.data.find(e => {
			return e.id === id;
		});
		return of(event);
	}

	public findEventDetailsById(id: number): Observable<EventDetails> {
		const event = this.data.find(e => {
			return e.id === id;
		});
		return of(event.eventDetails);
	}

	private applySort(data: EventFromDb[], activeSort: string, direction: number): EventFromDb[] {
		if (activeSort !== undefined) {
			if (direction === 1) {
				data.sort((a, b) => {
					if (a[activeSort] < b[activeSort]) {
						return -1;
					}
					if (a[activeSort] > b[activeSort]) {
						return 1;
					}
					return 0;
				});
			} else {
				data.sort((a, b) => {
					if (a[activeSort] > b[activeSort]) {
						return -1;
					}
					if (a[activeSort] < b[activeSort]) {
						return 1;
					}
					return 0;
				});
			}
		}
		return data;
	}

	private applyPagination(data: EventFromDb[], pageIndex: number, pageSize: number): EventFromDb[] {
		const temp: EventFromDb[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

