import { Component, OnInit } from '@angular/core';
import { DataModel } from '../../../models/data-models.model';
import { DataModelsService } from '../../../services/data-models.service';

@Component({
	selector: 'plug-data-models-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class DataModelsDocumentationComponent implements OnInit {

	public dataModels: DataModel[] = [];

	constructor(
		private dataModelsService: DataModelsService
	) {
		this.dataModelsService.search().subscribe(res => {
			this.dataModels = res.data;
		});
	}

	ngOnInit() {
	}

}
