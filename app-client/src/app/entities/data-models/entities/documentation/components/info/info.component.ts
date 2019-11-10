import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataModelFromDb } from '../../../../models/data-models.model';
import { DataModelsService } from '../../../../services/data-models.service';

@Component({
	selector: 'plug-data-models-documentation-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class DataModelsDocumentationInfoComponent implements OnInit {

	public dataModel: DataModelFromDb;

	constructor(
		private dataModelsService: DataModelsService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		this.route.params.pipe(
			switchMap(params => this.dataModelsService.findById(params['id']))
		).subscribe(dataModel => {
			this.dataModel = dataModel;
		});
	}

}
