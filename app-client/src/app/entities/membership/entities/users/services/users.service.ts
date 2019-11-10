import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { User, UserFromDb } from '../models/users.model';

@Injectable({
	providedIn: 'root'
})
export class TablesUsersService {

	data: UserFromDb[] = [
		{
			id: 4,
			role: 1,
			name: 'Javi',
			create_date: new Date().getTime() - (225 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (24 * 60 * 60 * 1000),
			modify_user: 'Javi'
		},
		{
			id: 6,
			role: 3,
			name: 'Alba',
			create_date: new Date().getTime() - (224 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (80 * 60 * 60 * 1000),
			modify_user: 'Javi'
		},
		{
			id: 12,
			role: 2,
			name: 'Pascual',
			create_date: new Date().getTime() - (223.6 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (223.6 * 60 * 60 * 1000),
			modify_user: 'admin'
		},
		{
			id: 15,
			role: 1,
			name: 'Jordi',
			create_date: new Date().getTime() - (223.2 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (98 * 60 * 60 * 1000),
			modify_user: 'Javi'
		},
		{
			id: 20,
			role: 1,
			name: 'Manuel',
			create_date: new Date().getTime() - (222 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (125 * 60 * 60 * 1000),
			modify_user: 'Javi'
		},
		{
			id: 23,
			role: 4,
			name: 'Silvia',
			create_date: new Date().getTime() - (221 * 60 * 60 * 1000),
			create_user: 'admin',
			modify_date: new Date().getTime() - (221 * 60 * 60 * 1000),
			modify_user: 'Manuel'
		}
	];

	public search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<UserFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<UserFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public update(user: User): Observable<any> {
		if (user.id) {
			let foundUser = this.data.find(u => {
				return u.id === user.id;
			});
			foundUser = Object.assign(foundUser, user);
		} else {
			const newId = Math.max(...this.data.map(u => u.id)) + 1;
			const newUser: UserFromDb = {
				id: newId,
				role: user.role,
				name: user.name,
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			};
			this.data.push(newUser);
		}
		return of(true);
	}

	public delete(id: number): Observable<any> {
		const index = this.data.findIndex(u => u.id === id);
		this.data.splice(index, 1);
		return of(true);
	}

	public findById(id: number): Observable<UserFromDb> {
		const user = this.data.find(u => {
			return u.id === id;
		});
		return of(user);
	}

	private applySort(data: UserFromDb[], activeSort: string, direction: number): UserFromDb[] {
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

	private applyPagination(data: UserFromDb[], pageIndex: number, pageSize: number): UserFromDb[] {
		const temp: UserFromDb[] = [];
		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

