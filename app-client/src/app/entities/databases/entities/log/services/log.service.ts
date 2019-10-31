import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { LogDetails, LogDetailsFromDb, LogFromDb, LogLevel } from '../models/log.model';

@Injectable({
	providedIn: 'root'
})
export class DatabasesLogService {

	data: LogFromDb[] = [
		{
			id: 1,
			name: 'Log de prueba 1',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 2,
			name: 'Log de prueba 2',
			level: LogLevel.ERROR,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 3,
			name: 'Log de prueba 3',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 4,
			name: 'Log de prueba 4',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 5,
			name: 'Log de prueba 5',
			level: LogLevel.ERROR,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 6,
			name: 'Log de prueba 6',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 7,
			name: 'Log de prueba 7',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 8,
			name: 'Log de prueba 8',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 9,
			name: 'Log de prueba 9',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 10,
			name: 'Log de prueba 10',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		},
		{
			id: 11,
			name: 'Log de prueba 11',
			level: LogLevel.INFO,
			create_date: new Date().getTime(),
			create_user: 'admin'
		}
	];

	logDetails: LogDetailsFromDb[] = [
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
		Observable<ITablesResults<LogFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<LogFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findById(id: number): Observable<LogFromDb> {
		const log = this.data.find(l => {
			return l.id === id;
		});
		return of(log);
	}

	public findLogDetailsById(id: number): Observable<LogDetails> {
		const logDetails = this.logDetails.find(ld => {
			return ld.id === id;
		});
		return of(logDetails);
	}

	private applySort(data: LogFromDb[], activeSort: string, direction: string): LogFromDb[] {
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

	private applyPagination(data: LogFromDb[], pageIndex: number, pageSize: number): LogFromDb[] {
		const temp: LogFromDb[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

