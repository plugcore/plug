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
			id: 1,
			role: 1,
			name: 'User de prueba 1',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			role: 1,
			name: 'User de prueba 2',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			role: 1,
			name: 'User de prueba 3',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			role: 1,
			name: 'User de prueba 4',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 5,
			role: 1,
			name: 'User de prueba 5',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 6,
			role: 1,
			name: 'User de prueba 6',
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		}
	];

	public search(activeSort: string, direction: string, formValue: string[], pageIndex: number, pageSize: number):
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

	private applySort(data: UserFromDb[], activeSort: string, direction: string): UserFromDb[] {
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

	private applyPagination(data: UserFromDb[], pageIndex: number, pageSize: number): UserFromDb[] {
		const temp: UserFromDb[] = [];
		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

