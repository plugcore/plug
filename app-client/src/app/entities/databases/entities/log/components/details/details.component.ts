import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatabasesLogService } from '../../services/log.service';

@Component({
	selector: 'plug-databases-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DatabasesLogDetailsComponent implements OnInit {

	@Input() public data: string;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public log: any;

	constructor(
		private databasesLogService: DatabasesLogService
	) { }

	ngOnInit() {
		this.databasesLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = res;
		});
	}

}
