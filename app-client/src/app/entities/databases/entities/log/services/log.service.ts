import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { TPartialLog, LogFromDb } from '../../../../../models/log.model';

interface IDatabaseLogProperties {
	database: string;
}

@Injectable({
	providedIn: 'root'
})
export class DatabasesLogService {

	public databseSelected = '0';

	private baseLogs: TPartialLog<IDatabaseLogProperties>[] = [
		{ level: 30, msg: 'Creating new reservation: 149932', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Updaring reservation: 350217', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Updaring reservation: 126245', additionalProperties: { database: '1' } },
		{ level: 50, msg: 'Unable to create reservation with id [126245], already exists', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Removing: 69191', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Removing: 3456', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Updaring reservation: 34671332', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Removing: 123412342', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Removing: 54', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Creating new reservation: 149932', additionalProperties: { database: '1' } },
		{ level: 50, msg: 'Unable to remove reservation with id [9999], not found', additionalProperties: { database: '1' } },
		{ level: 30, msg: 'Creating reserfation log for [PMI|BCN|TRUE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [ERT|PMI|FALSE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [PE|PMI|FALSE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [VDW|BCN|TRUE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [QPD|MAD|TRUE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [REP|MAD|FALSE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [HAT|BCN|FALSE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [VDW|BCN|TRUE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [QPD|MAD|TRUE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [REP|MAD|FALSE]', additionalProperties: { database: '2' } },
		{ level: 30, msg: 'Creating reserfation log for [HAT|BCN|FALSE]', additionalProperties: { database: '2' } },
		{ level: 20, msg: 'Registered API CALL at GET /reservations/find-user-reservations/{userId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at GET /tours/find-future-tours-in-city/{cityId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at GET /tours/find-related-products-for-tour/{tourId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at POST /reservations/', additionalProperties: { database: '3' } },
		{ level: 50, msg: 'Attemted to user an API token that is not registered: a8s93-asdf9291', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at GET /tours/find-future-tours-in-city/{cityId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at GET /tours/find-related-products-for-tour/{tourId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at GET /reservations/find-user-reservations/{userId}', additionalProperties: { database: '3' } },
		{ level: 20, msg: 'Registered API CALL at DELETE /reservations/cancel-reservation/{reservationId}',
			additionalProperties: { database: '3' } },
		{ level: 50, msg: 'Dashboard user created [50] with rol [97]', additionalProperties: { database: '3' } },
	];
	private logs: LogFromDb<IDatabaseLogProperties>[] = [];

	constructor() {
		let currId = 5417;
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
			time = time + (3.2 * 60 * 1013);
		}
	}

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<LogFromDb>> {

		const data = this.databseSelected !== '0' ?
		this.logs.filter(res => res.additionalProperties.database === this.databseSelected) : this.logs;

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

