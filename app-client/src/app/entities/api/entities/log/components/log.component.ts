import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { LEVELS } from '../../../../../models/log.model';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { ApiLogService } from '../services/log.service';
import { ApiLogDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-api-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class ApiLogComponent implements OnInit {

	public tableConfig: ITablesConfig;
	private reloadEvent = new EventEmitter<void>();

	public logTypeSelected = '0';
	public logTypes = [
		{
			value: '0',
			label: 'ALL'
		},
		{
			value: '1',
			label: 'GET /tours/find-future-tours-in-city/{cityId}'
		},
		{
			value: '2',
			label: 'GET /tours/find-related-products-for-tour/{tourId}'
		},
		{
			value: '3',
			label: 'POST /reservations/'
		},
		{
			value: '4',
			label: 'GET /reservations/find-user-reservations/{userId}'
		},
		{
			value: '5',
			label: 'DELETE /reservations/cancel-reservation/{reservationId}'
		},
	];

	constructor(
		private apiLogService: ApiLogService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.setLogTableConfig();
	}

	public logTypeSelectChanged(event: any) {
		this.apiLogService.apiSelected = event.value;
		this.logTypeSelected = event.value;
		this.reloadEvent.emit();
	}

	private setLogTableConfig() {
		this.tableConfig = {
			searchMethod: this.apiLogService.search.bind(this.apiLogService),
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
		this.dialogService.openModal(ApiLogDetailsComponent, 'Log Details', element.id).subscribe();
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
