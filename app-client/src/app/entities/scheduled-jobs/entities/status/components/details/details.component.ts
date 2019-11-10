import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduledJobsEventService } from '../../services/event.service';

@Component({
	selector: 'plug-scheduled-jobs-status-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class ScheduledJobsStatusDetailsComponent implements OnInit {

	@Input() public data: number;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public event: any;

	constructor(
		private scheduledJobsEventService: ScheduledJobsEventService
	) { }

	ngOnInit() {
		this.scheduledJobsEventService.findEventDetailsById(this.data).subscribe(res => {
			this.event = res;
		});
	}

}
