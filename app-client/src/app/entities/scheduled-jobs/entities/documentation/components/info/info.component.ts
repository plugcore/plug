import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ScheduledJobsService } from '../../../../services/scheduled-jobs.service';

@Component({
	selector: 'plug-scheduled-jobs-documentation-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class ScheduledJobsDocumentationInfoComponent implements OnInit {

	private id: number;

	constructor(
		private scheduledJobsService: ScheduledJobsService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		this.route.params.pipe(
			map(params => parseInt(params['id'], 10)),
			takeWhile(id => !isNaN(id)),
			tap(id => { this.id = id; }),
			switchMap(() => this.scheduledJobsService.findById(this.id))
		).subscribe(scheduledJob => {
			console.log(scheduledJob);
		});
	}

}
