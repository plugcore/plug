import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { ApiTokenFromDb, ApiToken } from '../models/api-token.model';

@Injectable({
	providedIn: 'root'
})
export class TablesApiTokenService {

	public data: ApiTokenFromDb[] = [
		{
			id: 1,
			name: 'Access to everything',
			credentialsType: 'token',
			credentials: {
				token: '22smgxx0j1t7fzswuscat'
			},
			availableApis: {
				tours: {
					findToursInCity: true,
					findRelatedProductsForTour: true,
				},
				reservations: {
					createReservation: true,
					findUserReservations: true,
					cancelReservation: true,
				}
			},
			status: {
				callsMade: 6236,
				mbTrasnferd: 9123
			},
			quota: {
				intervalCalls: 'any',
				intervalMb: 'any'
			},
			create_date: new Date().getTime() - (58 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (58 * 60 * 60 * 1000),
			modify_user: 'admin'
		},
		{
			id: 2,
			name: 'Only tours',
			credentialsType: 'user',
			credentials: {
				user: 'onlytours',
				password: '1234'
			},
			availableApis: {
				tours: {
					findToursInCity: true,
					findRelatedProductsForTour: true,
				},
				reservations: {
					createReservation: false,
					findUserReservations: false,
					cancelReservation: false,
				}
			},
			status: {
				callsMade: 15783,
				mbTrasnferd: 897
			},
			quota: {
				intervalCalls: 'month',
				intervalMb: 'year',
				intervalCallsVal: 1,
				intervalMbVal: 1,
				calls: 20000,
				mb: 10000
			},
			create_date: new Date().getTime() - (106 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (106 * 60 * 60 * 1000),
			modify_user: 'admin'
		},
		{
			id: 3,
			name: 'Only reservations',
			credentialsType: 'jwt',
			credentials: {
				payload: {
					mail: 'test@gmail.com'
				},
				payloadToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoidGVzdEBnbWFpbC5jb20ifQ.2aD1OkRYgSl_lftFmyUOnT3QBjA_gOex8qAY9tU1xeQ'
			},
			availableApis: {
				tours: {
					findToursInCity: false,
					findRelatedProductsForTour: false,
				},
				reservations: {
					createReservation: true,
					findUserReservations: true,
					cancelReservation: true,
				}
			},
			status: {
				callsMade: 588,
				mbTrasnferd: 20
			},
			quota: {
				intervalCalls: 'minute',
				intervalMb: 'day',
				intervalCallsVal: 30,
				intervalMbVal: 1,
				calls: 1000,
				mb: 50
			},
			create_date: new Date().getTime() - (98 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (98 * 60 * 60 * 1000),
			modify_user: 'admin'
		}
	];

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<ApiTokenFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<ApiTokenFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findAll(): ApiTokenFromDb[] {
		return this.data;
	}

	public update(token: ApiToken): Observable<any> {
		if (token.id) {
			let foundToken = this.data.find(r => {
				return r.id === token.id;
			});
			foundToken = Object.assign(foundToken, token);
			if (foundToken.credentialsType === 'token' && !(<any>foundToken.credentials).token) {
				(<any>foundToken.credentials).token = this.randomToken();
			}
			if (foundToken.credentialsType === 'jwt' && !(<any>foundToken.credentials).payloadToken) {
				(<any>foundToken.credentials).payloadToken = this.jwtToken();
			}
		} else {
			const newId = Math.max(...this.data.map(r => r.id)) + 1;
			const newToken: ApiTokenFromDb = {
				id: newId,
				name: token.name,
				credentialsType: token.credentialsType,
				credentials: token.credentials,
				availableApis: token.availableApis,
				status: {
					callsMade: 0,
					mbTrasnferd: 0
				},
				quota: token.quota,
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'admin'
			};
			this.data.push(newToken);
		}
		return of(true);
	}

	public delete(id: number): Observable<any> {
		const index = this.data.findIndex(r => r.id === id);
		this.data.splice(index, 1);
		return of(true);
	}

	public findById(id: number): Observable<ApiTokenFromDb> {
		const token = this.data.find(r => {
			return r.id === id;
		});
		return of(token);
	}

	private applySort(data: ApiTokenFromDb[], activeSort: string, direction: number): ApiTokenFromDb[] {
		console.log(direction);
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

	private applyPagination(data: ApiTokenFromDb[], pageIndex: number, pageSize: number): ApiTokenFromDb[] {
		const temp: ApiTokenFromDb[] = [];
		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

	public randomToken() {
		return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	public jwtToken() {
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoidGVzdEBnbTJhaWwuY29tIn0.YJSyj3OPS3FctvlhFumMROU6sYOUhTaXlCBSpQ2Q9y8';
	}

}

