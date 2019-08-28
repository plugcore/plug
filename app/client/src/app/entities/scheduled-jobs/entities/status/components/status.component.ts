import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { ScheduledJobsEventService } from '../services/event.service';
import { PlugDialogService } from '../../../../../components/dialog/services/dialog.service';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';
import { ScheduledJobsStatusDetailsComponent } from './details/details.component';

@Component({
	selector: 'plug-scheduled-jobs-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class ScheduledJobsStatusComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private scheduledJobsEventService: ScheduledJobsEventService,
		private dialogService: PlugDialogService,
		private plugToastService: PlugToastService,
		private router: Router
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
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'STATUS', columnAttribute: 'status', columnSort: true,
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
		this.dialogService.openModal(ScheduledJobsStatusDetailsComponent, 'Event Details', element.id).subscribe();
		return true;
	}

}
