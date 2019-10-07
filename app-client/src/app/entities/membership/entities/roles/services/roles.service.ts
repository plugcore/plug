import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITablesResults } from '../../../../../components/table/interfaces/table.interface';
import { RoleFromDb, Role } from '../models/roles.model';

@Injectable({
	providedIn: 'root'
})
export class TablesRolesService {

	data: RoleFromDb[] = [
		{
			id: 1,
			name: 'Rol de prueba 1',
			permissions: {
				dataModelsDocumentation: false,
				databasesStatus: true,
				databasesDocumentation: false,
				databasesLog: true,
				apiStatus: true,
				apiDocumentation: true,
				apiLog: true,
				plugsStatus: true,
				plugsDocumentation: true,
				plugsLog: true,
				scheduledJobsStatus: false,
				scheduledJobsDocumentation: false,
				scheduledJobsLog: false,
				membershipUsers: false,
				membershipRoles: true,
				systemConfiguration: false,
				systemLog: false
			},
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 2,
			name: 'Rol de prueba 2',
			permissions: {
				dataModelsDocumentation: false,
				databasesStatus: true,
				databasesDocumentation: false,
				databasesLog: true,
				apiStatus: true,
				apiDocumentation: true,
				apiLog: true,
				plugsStatus: true,
				plugsDocumentation: true,
				plugsLog: true,
				scheduledJobsStatus: false,
				scheduledJobsDocumentation: false,
				scheduledJobsLog: false,
				membershipUsers: false,
				membershipRoles: true,
				systemConfiguration: false,
				systemLog: false
			},
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 3,
			name: 'Rol de prueba 3',
			permissions: {
				dataModelsDocumentation: false,
				databasesStatus: true,
				databasesDocumentation: false,
				databasesLog: true,
				apiStatus: true,
				apiDocumentation: true,
				apiLog: true,
				plugsStatus: true,
				plugsDocumentation: true,
				plugsLog: true,
				scheduledJobsStatus: false,
				scheduledJobsDocumentation: false,
				scheduledJobsLog: false,
				membershipUsers: false,
				membershipRoles: true,
				systemConfiguration: false,
				systemLog: false
			},
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		},
		{
			id: 4,
			name: 'Rol de prueba 4',
			permissions: {
				dataModelsDocumentation: false,
				databasesStatus: true,
				databasesDocumentation: false,
				databasesLog: true,
				apiStatus: true,
				apiDocumentation: true,
				apiLog: true,
				plugsStatus: false,
				plugsDocumentation: false,
				plugsLog: false,
				scheduledJobsStatus: false,
				scheduledJobsDocumentation: false,
				scheduledJobsLog: false,
				membershipUsers: false,
				membershipRoles: true,
				systemConfiguration: false,
				systemLog: false
			},
			create_date: new Date().getTime(),
			create_user: 'admin',
			modify_date: new Date().getTime(),
			modify_user: 'nimda'
		}
	];

	public search(activeSort: string, direction: string, formValue: string[], pageIndex: number, pageSize: number):
		Observable<ITablesResults<RoleFromDb>> {

		const lenght = this.data.length;
		this.data = this.applySort(this.data, activeSort, direction);
		const newData = this.applyPagination(this.data, pageIndex, pageSize);
		const result: ITablesResults<RoleFromDb> = {
			data: newData,
			total: lenght
		};
		return of(result);
	}

	public findAll(): RoleFromDb[] {
		return this.data;
	}

	public update(role: Role): Observable<any> {
		if (role.id) {
			let foundRole = this.data.find(r => {
				return r.id === role.id;
			});
			foundRole = Object.assign(foundRole, role);
		} else {
			const newId = Math.max(...this.data.map(r => r.id)) + 1;
			const newRole: RoleFromDb = {
				id: newId,
				name: role.name,
				permissions: role.permissions,
				create_date: new Date().getTime(),
				create_user: 'admin',
				modify_date: new Date().getTime(),
				modify_user: 'nimda'
			};
			this.data.push(newRole);
		}
		return of(true);
	}

	public delete(id: number): Observable<any> {
		const index = this.data.findIndex(r => r.id === id);
		this.data.splice(index, 1);
		return of(true);
	}

	public findById(id: number): Observable<RoleFromDb> {
		const role = this.data.find(r => {
			return r.id === id;
		});
		return of(role);
	}

	private applySort(data: RoleFromDb[], activeSort: string, direction: string): RoleFromDb[] {
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

	private applyPagination(data: RoleFromDb[], pageIndex: number, pageSize: number): RoleFromDb[] {
		const temp: RoleFromDb[] = [];
		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}

