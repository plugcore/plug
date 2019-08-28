import { Component, OnInit } from '@angular/core';
import { Database } from '../../../models/databases.model';
import { DatabasesService } from '../../../services/databases.service';

@Component({
	selector: 'plug-databases-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class DatabasesDocumentationComponent implements OnInit {

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
