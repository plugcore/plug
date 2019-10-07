import { Component, OnInit } from '@angular/core';
import { ScheduledJob } from '../../../models/scheduled-jobs.model';
import { ScheduledJobsService } from '../../../services/scheduled-jobs.service';

@Component({
	selector: 'plug-scheduled-jobs-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class ScheduledJobsDocumentationComponent implements OnInit {

	public scheduledJobs: ScheduledJob[] = [];

	constructor(
		private scheduledJobsService: ScheduledJobsService
	) {
		this.scheduledJobsService.search().subscribe(res => {
			this.scheduledJobs = res.data;
		});
	}

	ngOnInit() {
	}

}
