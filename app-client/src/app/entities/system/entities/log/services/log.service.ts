import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { LogFromDb, TPartialLog } from '../../../../../models/log.model';

@Injectable({
	providedIn: 'root'
})
export class SystemLogService {

	private baseLogs: TPartialLog[] = [
		{ level: 30, msg: 'Starting server ....' },
		{ level: 20, msg: 'Registered Plug: Holiday hotels' },
		{ level: 20, msg: 'Registered Plug: My rentacar' },
		{ level: 20, msg: 'Registered Plug: World airlines' },
		{ level: 20, msg: 'Registered Plug: Best tours' },
		{ level: 20, msg: 'Registered API: GET ​/tours​/find-future-tours-in-city​/{cityId}' },
		{ level: 20, msg: 'Registered API: GET ​/tours​/find-related-products-for-tour​/{tourId}' },
		{ level: 20, msg: 'Registered API: POST ​/reservations​/' },
		{ level: 20, msg: 'Registered API: GET ​/reservations​/find-user-reservations​/{userId}' },
		{ level: 20, msg: 'Registered API: DELETE ​/reservations​/cancel-reservation​/{reservationId}' },
		{ level: 30, msg: 'Server startup in 458 ms' },
		{ level: 30, msg: 'Stoping server ....' },
		{ level: 30, msg: 'Starting server ....' },
		{ level: 20, msg: 'Registered Plug: Holiday hotels' },
		{ level: 20, msg: 'Registered Plug: My rentacar' },
		{ level: 20, msg: 'Registered Plug: World airlines' },
		{ level: 20, msg: 'Registered Plug: Best tours' },
		{ level: 20, msg: 'Registered API: GET ​/tours​/find-future-tours-in-city​/{cityId}' },
		{ level: 20, msg: 'Registered API: GET ​/tours​/find-related-products-for-tour​/{tourId}' },
		{ level: 20, msg: 'Registered API: POST ​/reservations​/' },
		{ level: 20, msg: 'Registered API: GET ​/reservations​/find-user-reservations​/{userId}' },
		{ level: 20, msg: 'Registered API: DELETE ​/reservations​/cancel-reservation​/{reservationId}' },
		{ level: 30, msg: 'Server startup in 987 ms' },
	];
	private logs: LogFromDb[] = [];

	constructor() {
		let currId = 1587;
		let time = Date.now();
		for (const basicLog of this.baseLogs) {
			this.logs.push({
				...basicLog,
				...{
					id: currId.toString(),
					name: 'api-log',
					time: time,
					pid: 8754,
					hostname: 'vps5662933',
					v: '1'
				}
			});
			currId ++;
			time = time + (3.2 * 60 * 588);
		}
	}

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<LogFromDb>> {

		const data = this.logs;
		const lenght = data.length;
		this.applySort(data, activeSort, direction);
		const newData = this.applyPagination(data, pageIndex, pageSize);
		const result: ITablesResults<LogFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findById(id: string): Observable<LogFromDb> {
		const log = this.logs.find(l => {
			return l.id === id;
		});
		return of(log);
	}

	public findLogDetailsById(id: string): Observable<LogFromDb> {
		const logDetails = this.logs.find(ld => {
			return ld.id === id;
		});
		return of(logDetails);
	}

	private applySort(data: LogFromDb[], activeSort: string, direction: number): LogFromDb[] {
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

	private applyPagination(data: LogFromDb[], pageIndex: number, pageSize: number): LogFromDb[] {
		const temp: LogFromDb[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

