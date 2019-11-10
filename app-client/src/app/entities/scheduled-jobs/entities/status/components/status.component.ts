import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { ScheduledJobsEventService } from '../services/event.service';
import { ScheduledJobsStatusDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-scheduled-jobs-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class ScheduledJobsStatusComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	public jobTypeSelected = '0';
	public jobTypes = [
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
		private scheduledJobsEventService: ScheduledJobsEventService,
		private dialogService: PlugDialogService,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.scheduledJobsEventService.search.bind(this.scheduledJobsEventService),
			columns: [
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'NAME', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'STATUS', columnAttribute: 'status', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					ngClass: job => job.status
				},
				{
					columnName: 'CREATED ON', columnAttribute: 'create_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'CREATED BY', columnAttribute: 'create_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'visibility', action: this.view.bind(this), hideMethod: this.hideIfNoData }
			]
		};
	}

	private view(element: any): any {
		this.dialogService.openModal(ScheduledJobsStatusDetailsComponent, 'Event Details', element.id).subscribe();
		return true;
	}

	private hideIfNoData(element: any): any {
		return Object.keys(element.eventDetails || {}).length > 0;
	}

	private formatDate(date: number) {
		return this.dateInternalService.getFormatDateTime(date);
	}

	public jobTypeSelectChanged(event: any) {
		this.scheduledJobsEventService.jobTypeSelected = event.value;
		this.jobTypeSelected = event.value;
		this.reloadEvent.emit();
	}


}
