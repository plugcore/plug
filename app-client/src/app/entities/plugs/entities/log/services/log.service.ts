import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { TPartialLog, LogFromDb } from '../../../../../models/log.model';

interface ILpugLogProperties {
	plugId: string;
}

@Injectable({
	providedIn: 'root'
})
export class PlugsLogService {

	public plugSelected = '0';

	private baseLogs: TPartialLog<ILpugLogProperties>[] = [
		{ level: 30, msg: 'Searching tours for Hotels: PMI', additionalProperties: { plugId: '1' } },
		{ level: 20, msg: 'Hotels found for PMI: 67', additionalProperties: { plugId: '1' } },
		{ level: 30, msg: 'Searching tours for Hotels: BCN', additionalProperties: { plugId: '1' } },
		{ level: 20, msg: 'Hotels found for BCN: 87', additionalProperties: { plugId: '1' } },
		{ level: 30, msg: 'Searching tours for Hotels: MADD', additionalProperties: { plugId: '1' } },
		{ level: 50, msg: 'Invalid city [MADD]', additionalProperties: { plugId: '1' } },
		{ level: 30, msg: 'Searching cars for city: BCN', additionalProperties: { plugId: '2' } },
		{ level: 20, msg: 'No cars found for BCN in the given date', additionalProperties: { plugId: '2' } },
		{ level: 30, msg: 'Searching cars for city: MAD', additionalProperties: { plugId: '2' } },
		{ level: 20, msg: 'Vehicles found for MAD: 58', additionalProperties: { plugId: '2' } },
		{ level: 20, msg: 'Searching for roundtrip MAD-PWE', additionalProperties: { plugId: '3' } },
		{ level: 20, msg: 'Flights found: 58 - 98', additionalProperties: { plugId: '3' } },
		{ level: 20, msg: 'Searching for roundtrip BCN-TRE', additionalProperties: { plugId: '3' } },
		{ level: 20, msg: 'Flights found: 15 - 14', additionalProperties: { plugId: '3' } },
		{ level: 20, msg: 'Searching tours for city: BCN', additionalProperties: { plugId: '3' } },
		{ level: 50, msg: 'Connection error: TIMEOUT, retrying call ...', additionalProperties: { plugId: '3' } },
		{ level: 50, msg: 'Connection error: TIMEOUT, retrying call ...', additionalProperties: { plugId: '3' } },
		{ level: 20, msg: 'Tours found for city [BCN] -> [58]', additionalProperties: { plugId: '3' } },
	];
	private logs: LogFromDb<ILpugLogProperties>[] = [];

	constructor() {
		let currId = 2536;
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

		const data = this.plugSelected !== '0' ?
		this.logs.filter(res => res.additionalProperties.plugId === this.plugSelected) : this.logs;

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

