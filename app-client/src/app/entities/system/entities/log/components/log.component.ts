import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { SystemLogService } from '../services/log.service';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { SystemLogDetailsComponent } from './details/details.component';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { LEVELS } from '../../../../../models/log.model';


@Component({
	selector: 'plug-system-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class SystemLogComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private systemLogService: SystemLogService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.systemLogService.search.bind(this.systemLogService),
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
		this.dialogService.openModal(SystemLogDetailsComponent, 'Log Details', element.id).subscribe();
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
