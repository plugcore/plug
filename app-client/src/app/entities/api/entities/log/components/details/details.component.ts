import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiLogService } from '../../services/log.service';

@Component({
	selector: 'plug-api-log-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class ApiLogDetailsComponent implements OnInit {

	@Input() public data: string;
	@Output() public eventEemiter = new EventEmitter<any>();

	public log: Object;

	constructor(
		private apiLogService: ApiLogService
	) { }

	ngOnInit() {
		this.apiLogService.findLogDetailsById(this.data).subscribe(res => {
			this.log = res;
		});
	}

}
