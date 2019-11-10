import { Component, OnInit } from '@angular/core';
import { DataModel, PossibleDatamodels } from '../../../models/data-models.model';
import { DataModelsService } from '../../../services/data-models.service';
import { IRouteConf, LayoutRouterService } from '../../../../../components/layout/services/router/router.internal.service';

@Component({
	selector: 'plug-data-models-documentation',
	templateUrl: './documentation.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class DataModelsDocumentationComponent implements OnInit {

	public dataModels: DataModel<PossibleDatamodels>[] = [];
	public routeConf: IRouteConf;

	constructor(
		private dataModelsService: DataModelsService,
		private routerService: LayoutRouterService
	) {
		this.dataModelsService.search().subscribe(res => {
			this.dataModels = res.data;
		});
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.routeConf = routeConf;
		});
	}

	ngOnInit() {
	}

}
