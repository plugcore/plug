import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlugsLogService } from '../../services/log.service';

@Component({
	selector: 'plug-plugs-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class PlugsLogDetailsComponent implements OnInit {

	@Input() public data: string;
	@Output() public eventEemiter = new EventEmitter<any>();

	public log: any;

	constructor(
		private plugsLogService: PlugsLogService
	) { }

	ngOnInit() {
		this.plugsLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = res;
		});
	}

}
