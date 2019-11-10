import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { LEVELS } from '../../../../../models/log.model';
import { DatabasesLogService } from '../services/log.service';
import { DatabasesLogDetailsComponent } from './details/details.component';
import { DateInternalService } from '../../../../../services/date/date.internal.service';

@Component({
	selector: 'plug-databases-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class DatabasesLogComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	public logTypeSelected = '0';
	public logTypes = [
		{
			value: '0',
			label: 'ALL'
		},
		{
			value: '1',
			label: 'PGsrv01'
		},
		{
			value: '2',
			label: 'MySQLsrv02'
		},
		{
			value: '3',
			label: 'MongoDbsrv03'
		}
	];

	constructor(
		private databasesLogService: DatabasesLogService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.databasesLogService.search.bind(this.databasesLogService),
			columns: [
				{
					columnName: 'TIME', columnAttribute: 'time', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'LEVEL', columnAttribute: 'level', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					columnEditor: this.getLogLevelName.bind(this),
					ngClass: log => ({
						[LEVELS[log.level] || LEVELS.default]: true
					})
				},
				{
					columnName: 'MSG', columnAttribute: 'msg', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.messageOrObject.bind(this)
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'visibility', action: this.view.bind(this) }
			]
		};
	}

	public logTypeSelectChanged(event: any) {
		this.databasesLogService.databseSelected = event.value;
		this.logTypeSelected = event.value;
		this.reloadEvent.emit();
	}

	private view(element: any): any {
		this.dialogService.openModal(DatabasesLogDetailsComponent, 'Log Details', element.id).subscribe();
		return true;
	}

	private formatDate(date: number) {
		return this.dateInternalService.getFormatDateTime(date);
	}

	private messageOrObject(msg?: any) {
		return msg ? msg : '[OBJECT]';
	}

	private getLogLevelName(level: string) {
		return LEVELS[level];
	}

}
