import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { LEVELS } from '../../../../../models/log.model';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { PlugsLogService } from '../services/log.service';
import { PlugsLogDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-plugs-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class PlugsLogComponent implements OnInit {

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
			label: 'Holiday hotels'
		},
		{
			value: '2',
			label: 'My rentacar'
		},
		{
			value: '3',
			label: 'World airlines'
		},
		{
			value: '4',
			label: 'Best tours'
		}
	];

	constructor(
		private plugsLogService: PlugsLogService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.plugsLogService.search.bind(this.plugsLogService),
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
		this.plugsLogService.plugSelected = event.value;
		this.logTypeSelected = event.value;
		this.reloadEvent.emit();
	}


	private view(element: any): any {
		this.dialogService.openModal(PlugsLogDetailsComponent, 'Log Details', element.id).subscribe();
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
