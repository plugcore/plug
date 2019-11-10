import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemLogService } from '../../services/log.service';

@Component({
	selector: 'plug-system-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class SystemLogDetailsComponent implements OnInit {

	@Input() public data: string;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public log: Object;

	constructor(
		private systemLogService: SystemLogService
	) { }

	ngOnInit() {
		this.systemLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = res;
		});
	}

}
