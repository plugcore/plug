import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { ApiFromDB } from '../models/api.model';

@Injectable({
	providedIn: 'root'
})
export class ApiStatusService {

	data: ApiFromDB[] = [
		{
			id: '1',
			name: '/animals',
			type: 'GET'
		},
		{
			id: '2',
			name: '/pets',
			type: 'POST'
		}
	];

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<ApiFromDB>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<ApiFromDB> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	private applySort(data: ApiFromDB[], activeSort: string, direction: number): ApiFromDB[] {
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

	private applyPagination(data: ApiFromDB[], pageIndex: number, pageSize: number): ApiFromDB[] {
		const temp: ApiFromDB[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

