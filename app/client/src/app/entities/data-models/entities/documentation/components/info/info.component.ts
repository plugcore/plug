import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { DataModelsService } from '../../../../services/data-models.service';

@Component({
	selector: 'plug-data-models-documentation-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class DataModelsDocumentationInfoComponent implements OnInit {

	private id: number;

	constructor(
		private dataModelsService: DataModelsService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		this.route.params.pipe(
			map(params => parseInt(params['id'], 10)),
			takeWhile(id => !isNaN(id)),
			tap(id => { this.id = id; }),
			switchMap(() => this.dataModelsService.findById(this.id))
		).subscribe(dataModel => {
			console.log(dataModel);
		});
	}

}
