import { Component, OnInit } from '@angular/core';
import { Database } from '../../../models/databases.model';
import { DatabasesService } from '../../../services/databases.service';

@Component({
	selector: 'plug-databases-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class DatabasesDocumentationComponent implements OnInit {

	public mongoImage = 'https://user-images.githubusercontent.com/11978772/40430921-73d53922-5e63-11e8-8dcd-1662136c3212.png';
	public mysqlImage = 'https://lwstatic-a.akamaihd.net/kb/wp-content/uploads/2015/01/MySQL.png';
	public pgImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png';

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
