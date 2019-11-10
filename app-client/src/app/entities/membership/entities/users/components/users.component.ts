import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { RoleFromDb } from '../../roles/models/roles.model';
import { TablesRolesService } from '../../roles/services/roles.service';
import { TablesUsersService } from '../services/users.service';

@Component({
	selector: 'plug-membership-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class MembershipUsersComponent implements OnInit {


	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();
	public roles: RoleFromDb[] = [];

	constructor(
		private tablesUsersService: TablesUsersService,
		private plugToastService: PlugToastService,
		private router: Router,
		private dateInternalService: DateInternalService,
		private tablesRolesService: TablesRolesService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.tablesUsersService.search.bind(this.tablesUsersService),
			createMethod: this.create.bind(this),
			columns: [
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'NAME', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'ROLE', columnAttribute: 'role', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					columnEditor: this.formatRole.bind(this)
				},
				{
					columnName: 'CREATED ON', columnAttribute: 'create_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'CREATED BY', columnAttribute: 'create_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'MODIFIED ON', columnAttribute: 'modify_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'MODIFIED BY', columnAttribute: 'modify_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'edit', urlGeneration: this.update },
				{ icon: 'delete', action: this.delete.bind(this) }
			]
		};
		this.roles = this.tablesRolesService.findAll();
	}

	private create() {
		this.router.navigate(['membership', 'users', 'update']);
	}

	private update(element: any): any[] {
		return ['membership', 'users', 'update', element.id];
	}

	private delete(element: any): void {
		this.tablesUsersService.delete(element.id).subscribe(() => {
			this.plugToastService.showToast(3000, `User '${element.name}' deleted correctly`);
			this.reloadEvent.emit();
		});
	}

	private formatDate(date: number) {
		return this.dateInternalService.getFormatDateTime(date);
	}

	private formatRole(role: number) {
		return this.roles.find(r => r.id === role).name;
	}

}
