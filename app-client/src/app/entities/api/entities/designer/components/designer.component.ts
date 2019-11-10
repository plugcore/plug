import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { ApiFromDb, ApiTypeDetector } from '../models/designer.model';
import { TablesApiDesignerService } from '../services/designer.service';

@Component({
	selector: 'plug-api-designer',
	templateUrl: './designer.component.html',
	styleUrls: ['./designer.component.scss']
})
export class ApiDesignerComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private tablesApiDesignerService: TablesApiDesignerService,
		private plugToastService: PlugToastService,
		private router: Router,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.tablesApiDesignerService.search.bind(this.tablesApiDesignerService),
			createMethod: this.create.bind(this),
			columns: [
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
				},
				{
					columnName: 'METHOD', columnAttribute: 'method', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: false },
					ngClass: api => api.method
				},
				{
					columnName: 'URI', columnAttribute: 'uri', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					ngClass: () => 'no-wrap'
				},
				{
					columnName: 'TAGS', columnAttribute: 'tags', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
				{
					columnName: 'TYPE', columnAttribute: 'type', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatType.bind(this)
				},
				{
					columnName: 'DESCRIPTION', columnAttribute: 'description', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				},
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'edit', urlGeneration: this.update },
				{ icon: 'delete', action: this.delete.bind(this), hideMethod: api => ApiTypeDetector.isApiProxy(api) }
			]
		};
	}

	private create() {
		this.router.navigate(['api', 'designer', 'update']);
	}

	private update(element: any): any[] {
		return ['api', 'designer', 'update', element.id];
	}

	private delete(element: any): void {
		this.tablesApiDesignerService.delete(element.id).subscribe(() => {
			this.plugToastService.showToast(3000, `Api '${element.method} ${element.uri}' deleted correctly`);
			this.reloadEvent.emit();
		});
	}

	private formatType(_: any, api: ApiFromDb) {
		return ApiTypeDetector.isApiProxy(api) ? 'PROXY' : 'INTERNAL';
	}

}
