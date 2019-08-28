import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { TablesRolesService } from '../services/roles.service';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';

@Component({
	selector: 'plug-membership-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss']
})
export class MembershipRolesComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private tablesRolesService: TablesRolesService,
		private plugToastService: PlugToastService,
		private router: Router
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.tablesRolesService.search.bind(this.tablesRolesService),
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
		this.router.navigate(['membership', 'roles', 'update']);
	}

	private update(element: any): any[] {
		return ['membership', 'roles', 'update', element.id];
	}

	private delete(element: any): void {
		this.tablesRolesService.delete(element.id).subscribe(() => {
			this.plugToastService.showToast(3000, `Role '${element.name}' deleted correctly`);
			this.reloadEvent.emit();
		});
	}

}
