import { Component, OnInit } from '@angular/core';
import { Plug } from '../../../models/plugs.model';
import { PlugsService } from '../../../services/plugs.service';

@Component({
	selector: 'plug-plugs-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class PlugsDocumentationComponent implements OnInit {

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
