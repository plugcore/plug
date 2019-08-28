import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { EventDetails, EventDetailsFromDb, EventFromDb, EventStatus } from '../models/event.model';

@Injectable({
	providedIn: 'root'
})
export class ScheduledJobsEventService {

	data: EventFromDb[] = [
		{
			id: 1,
			name: 'Evento de prueba 1',
			status: EventStatus.COMPLETED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 2,
			name: 'Evento de prueba 2',
			status: EventStatus.QUEUED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 3,
			name: 'Evento de prueba 3',
			status: EventStatus.FAILED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 4,
			name: 'Evento de prueba 4',
			status: EventStatus.SCHEDULED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 5,
			name: 'Evento de prueba 5',
			status: EventStatus.RUNNING,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 6,
			name: 'Evento de prueba 6',
			status: EventStatus.COMPLETED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 7,
			name: 'Evento de prueba 7',
			status: EventStatus.COMPLETED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 8,
			name: 'Evento de prueba 8',
			status: EventStatus.RUNNING,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 9,
			name: 'Evento de prueba 9',
			status: EventStatus.QUEUED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 10,
			name: 'Evento de prueba 10',
			status: EventStatus.FAILED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 11,
			name: 'Evento de prueba 11',
			status: EventStatus.COMPLETED,
			create_date: new Date().getTime(),
			create_user: 'admin'
		}
	];

	eventDetails: EventDetailsFromDb[] = [
		{
			id: 1,
			message: {
				type: 'a',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 2,
			message: {
				type: 'b',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 3,
			message: {
				type: 'c',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 4,
			message: {
				type: 'd',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 5,
			message: {
				type: 'e',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 6,
			message: {
				type: 'f',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 7,
			message: {
				type: 'g',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 8,
			message: {
				type: 'h',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 9,
			message: {
				type: 'i',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 10,
			message: {
				type: 'j',
				log: 'Lorem ipsum'
			}
		},
		{
			id: 11,
			message: {
				type: 'k',
				log: 'Lorem ipsum'
			}
		},
	];

	public search(activeSort: string, direction: string, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<EventFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
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
		const eventDetails = this.eventDetails.find(ed => {
			return ed.id === id;
		});
		return of(eventDetails);
	}

	private applySort(data: EventFromDb[], activeSort: string, direction: string): EventFromDb[] {
		if (activeSort !== undefined) {
			if (direction === 'asc') {
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

