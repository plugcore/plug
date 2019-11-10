import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduledJobsLogService } from '../../services/log.service';

@Component({
	selector: 'plug-scheduled-jobs-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class ScheduledJobsLogDetailsComponent implements OnInit {

	@Input() public data: string;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public log: any;

	constructor(
		private scheduledJobsLogService: ScheduledJobsLogService
	) { }

	ngOnInit() {
		this.scheduledJobsLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = res;
		});
	}

}
