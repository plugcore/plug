import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { LEVELS } from '../../../../../models/log.model';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { ScheduledJobsLogService } from '../services/log.service';
import { ScheduledJobsLogDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-scheduled-jobs-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class ScheduledJobsLogComponent implements OnInit {

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
			label: 'Mail to users'
		},
		{
			value: '2',
			label: 'Daily stats to direction'
		}
	];

	constructor(
		private scheduledJobsLogService: ScheduledJobsLogService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.scheduledJobsLogService.search.bind(this.scheduledJobsLogService),
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

	private view(element: any): any {
		this.dialogService.openModal(ScheduledJobsLogDetailsComponent, 'Log Details', element.id).subscribe();
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

	public logTypeSelectChanged(event: any) {
		this.scheduledJobsLogService.jobSelected = event.value;
		this.logTypeSelected = event.value;
		this.reloadEvent.emit();
	}

}
