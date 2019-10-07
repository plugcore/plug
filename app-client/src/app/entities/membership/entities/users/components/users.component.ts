import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { TablesUsersService } from '../services/users.service';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';

@Component({
	selector: 'plug-membership-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class MembershipUsersComponent implements OnInit {


	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private tablesUsersService: TablesUsersService,
		private plugToastService: PlugToastService,
		private router: Router
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.tablesUsersService.search.bind(this.tablesUsersService),
			createMethod: this.create.bind(this),
			columns: [
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'NAME', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'CREATED ON', columnAttribute: 'create_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'CREATED BY', columnAttribute: 'create_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'MODIFIED ON', columnAttribute: 'modify_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
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

}
