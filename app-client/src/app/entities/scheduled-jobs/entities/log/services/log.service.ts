import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { TPartialLog, LogFromDb } from '../../../../../models/log.model';

interface IJobLogProperties {
	jobId: string;
}

@Injectable({
	providedIn: 'root'
})
export class ScheduledJobsLogService {

	public jobSelected = '0';


	private baseLogs: TPartialLog<IJobLogProperties>[] = [
		{ level: 20, msg: 'Loading mails to send to users. users found: 147', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 8617', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 142', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 2355', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 123', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to direction. Total tours booked today: 12', additionalProperties: { jobId: '2' } },
		{ level: 30, msg: 'Mail sent to user 12342', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 8617', additionalProperties: { jobId: '1' } },
		{ level: 50, msg: 'Error while sending mail to aasd%1fs@333.mail. Mail not found', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 2345', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 3457º1', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 134', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 6345', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 565623', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to direction. Total tours booked today: 73', additionalProperties: { jobId: '2' } },
		{ level: 30, msg: 'Mail sent to user 12341', additionalProperties: { jobId: '1' } },
		{ level: 50, msg: 'Error while sending mail to as`fs@test.mail. Mail not found', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 2341235', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 24612', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to user 62341', additionalProperties: { jobId: '1' } },
		{ level: 30, msg: 'Mail sent to direction. Total tours booked today: 87', additionalProperties: { jobId: '2' } }
	];
	private logs: LogFromDb<IJobLogProperties>[] = [];

	constructor() {
		let currId = 4777;
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
			time = time + (3.2 * 60 * 60 * 1013);
		}
	}

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<LogFromDb>> {

		const data = this.jobSelected !== '0' ?
			this.logs.filter(res => res.additionalProperties.jobId === this.jobSelected) : this.logs;

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

