import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { PlugsService } from '../../../../services/plugs.service';

@Component({
	selector: 'plug-plugs-documentation-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class PlugsDocumentationInfoComponent implements OnInit {

	private id: number;

	constructor(
		private plugsService: PlugsService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		this.route.params.pipe(
			map(params => parseInt(params['id'], 10)),
			takeWhile(id => !isNaN(id)),
			tap(id => { this.id = id; }),
			switchMap(() => this.plugsService.findById(this.id))
		).subscribe(dataModel => {
			console.log(dataModel);
		});
	}

}
