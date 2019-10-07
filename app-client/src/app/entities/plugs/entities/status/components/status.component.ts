import { Component, OnInit } from '@angular/core';
import { PlugsService } from '../../../services/plugs.service';
import { Plug } from '../../../models/plugs.model';

@Component({
	selector: 'plug-plugs-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class PlugsStatusComponent implements OnInit {

	public plugs: Plug[] = [];

	constructor(
		private plugsService: PlugsService
	) {
		this.plugsService.search().subscribe(res => {
			this.plugs = res.data;
		});
	}

	ngOnInit() {
	}

}
