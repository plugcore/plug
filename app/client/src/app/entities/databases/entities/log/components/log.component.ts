import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';
import { DatabasesLogService } from '../services/log.service';
import { DatabasesLogDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-databases-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class DatabasesLogComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private databasesLogService: DatabasesLogService,
		private dialogService: PlugDialogService,
		private plugToastService: PlugToastService,
		private router: Router
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.databasesLogService.search.bind(this.databasesLogService),
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
					columnName: 'LEVEL', columnAttribute: 'level', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'CREATED ON', columnAttribute: 'create_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'CREATED BY', columnAttribute: 'create_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'visibility', action: this.view.bind(this) }
			]
		};
	}

	private view(element: any): any {
		this.dialogService.openModal(DatabasesLogDetailsComponent, 'Log Details', element.id).subscribe();
		return true;
	}

}
