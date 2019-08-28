import { Component, OnInit } from '@angular/core';
import { Database } from '../../../models/databases.model';
import { DatabasesService } from '../../../services/databases.service';

@Component({
	selector: 'plug-databases-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class DatabasesStatusComponent implements OnInit {

	public databases: Database[] = [];

	constructor(
		private databasesService: DatabasesService
	) {
		this.databasesService.search().subscribe(res => {
			this.databases = res.data;
		});
	}

	ngOnInit() {
	}

}
