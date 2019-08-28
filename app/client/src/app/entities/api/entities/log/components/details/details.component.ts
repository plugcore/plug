import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiLogService } from '../../services/log.service';

@Component({
	selector: 'plug-api-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class ApiLogDetailsComponent implements OnInit {

	@Input() public data: number;
	@Output() public eventEmmiter = new EventEmitter<any>();

	public log: string;

	constructor(
		private apiLogService: ApiLogService
	) { }

	ngOnInit() {
		this.apiLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = JSON.stringify(res);
		});
	}

}
