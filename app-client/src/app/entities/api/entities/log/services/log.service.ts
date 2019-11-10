import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { LogFromDb, TPartialLog } from '../../../../../models/log.model';

interface IApiLogProperties {
	apiId: string;
}

@Injectable({
	providedIn: 'root'
})
export class ApiLogService {

	public apiSelected = '0';

	private baseLogs: TPartialLog<IApiLogProperties>[] = [
		{ level: 30, msg: 'Searching tours for city: PMI', additionalProperties: { apiId: '1' } },
		{ level: 30, msg: 'Searching tours for city: BCN', additionalProperties: { apiId: '1' } },
		{ level: 30, msg: 'Searching tours for city: MAD', additionalProperties: { apiId: '1' } },
		{ level: 20, msg: 'Number of tours for PMI -> 25', additionalProperties: { apiId: '1' } },
		{ level: 20, msg: 'Number of tours for MAD -> 40', additionalProperties: { apiId: '1' } },
		{ level: 50, msg: 'No search results for city: PWQ', additionalProperties: { apiId: '1' } },
		{ level: 20, msg: 'Number of tours for BCN -> 80', additionalProperties: { apiId: '1' } },
		{ level: 50, msg: 'No search result for city: ARN', additionalProperties: { apiId: '1' } },
		{ level: 30, msg: 'Searching realted products from tour {1482}', additionalProperties: { apiId: '2' } },
		{ level: 30, msg: 'Searching realted products from tour {877669}', additionalProperties: { apiId: '2' } },
		{ level: 30, msg: 'Searching realted products from tour {84177}', additionalProperties: { apiId: '2' } },
		{ level: 50, msg: 'Error while trying to access vehicles services for city: PAW', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Return flight results for tour {877669}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Departing flight results for tour {84177}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Veicle results for tour {877669}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Veicle results for tour {84177}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Veicle results for tour {1482}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Hotel room results for tour {1482}: 51', additionalProperties: { apiId: '2' } },
		{ level: 20, msg: 'Hotel room results for tour {84177}: 51', additionalProperties: { apiId: '2' } },
		{ level: 30, msg: 'Creating a new reservation for user {147563} at 18/05/2020 in PMI', additionalProperties: { apiId: '3' } },
		{ level: 30, additionalProperties: <any>{
			apiId: '3',
			userId: '147563',
			tourId: '9987',
			hotelRoomId: '79798561123',
			flights: {
				'departingFlight': '2345236347',
				'returningFlight': '23542364567'
			},
			vehicleId: '9887641321564'
		} },
		{ level: 30, msg: 'Creating a new reservation for user {792} at 1/07/2020 in BCN', additionalProperties: { apiId: '3' } },
		{ level: 30, additionalProperties: <any>{
			apiId: '3',
			userId: '792',
			tourId: '9987',
			hotelRoomId: '79798561123',
			flights: {
				'departingFlight': '2345236347',
				'returningFlight': '23542364567'
			},
			vehicleId: '9887641321564'
		} },
		{ level: 30, msg: 'Creating a new reservation for user {1234} at 9/10/2020 in MAD', additionalProperties: { apiId: '3' } },
		{ level: 30, additionalProperties: <any>{
			apiId: '3',
			userId: '1234',
			tourId: '9987',
			hotelRoomId: '79798561123',
			flights: {
				'departingFlight': '2345236347',
				'returningFlight': '23542364567'
			},
			vehicleId: '9887641321564'
		} },
		{ level: 50, msg: 'Error creating a new reservation for user {6474567}, the date is from past', additionalProperties: { apiId: '3' } },
		{ level: 20, msg: 'Reservations for user [7896]: 3', additionalProperties: { apiId: '4' } },
		{ level: 20, msg: 'Reservations for user [1234]: 10', additionalProperties: { apiId: '4' } },
		{ level: 20, msg: 'Reservations for user [67123]: 0', additionalProperties: { apiId: '4' } },
		{ level: 50, msg: 'Unable to show reservations for user [a123]: User not found', additionalProperties: { apiId: '4' } },
		{ level: 20, msg: 'Canceling reservation -1234-', additionalProperties: { apiId: '5' } },
		{ level: 20, msg: 'Canceling reservation -98135-', additionalProperties: { apiId: '5' } },
		{ level: 20, msg: 'Canceling reservation -8784-', additionalProperties: { apiId: '5' } },
		{ level: 50, msg: 'Reservation doesn\'t exists: >5999-<', additionalProperties: { apiId: '5' } },
	];
	private logs: LogFromDb<IApiLogProperties>[] = [];

	constructor() {
		let currId = 3987;
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

		const data = this.apiSelected !== '0' ?
			this.logs.filter(res => res.additionalProperties.apiId === this.apiSelected) : this.logs;

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

	private applySort(data: LogFromDb[], activeSort: string, direction: number) {
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
	}

	private applyPagination(data: LogFromDb[], pageIndex: number, pageSize: number): LogFromDb[] {
		const temp: LogFromDb[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

