import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlugsLogService } from '../../services/log.service';

@Component({
	selector: 'plug-plugs-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class PlugsLogDetailsComponent implements OnInit {

	@Input() public data: number;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public log: string;

	constructor(
		private plugsLogService: PlugsLogService
	) { }

	ngOnInit() {
		this.plugsLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = JSON.stringify(res);
		});
	}

}
