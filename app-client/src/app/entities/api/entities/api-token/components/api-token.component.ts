import { Component, OnInit, EventEmitter } from '@angular/core';
import { ITablesConfig } from '../../../../../components/table/interfaces/table.interface';
import { PlugToastService } from '../../../../../components/toast/services/toast.service';
import { Router } from '@angular/router';
import { DateInternalService } from '../../../../../services/date/date.internal.service';
import { TablesApiTokenService } from '../services/api-token.service';
import { ApiTokenFromDb } from '../models/api-token.model';

@Component({
	selector: 'plug-api-api-token',
	templateUrl: './api-token.component.html',
	styleUrls: ['./api-token.component.scss']
})
export class ApiApiTokenComponent implements OnInit {

	public tableConfig: ITablesConfig;
	reloadEvent = new EventEmitter<void>();

	constructor(
		private tablesApiTokenService: TablesApiTokenService,
		private plugToastService: PlugToastService,
		private router: Router,
		private dateInternalService: DateInternalService
	) { }

	ngOnInit() {
		this.tableConfig = {
			searchMethod: this.tablesApiTokenService.search.bind(this.tablesApiTokenService),
			createMethod: this.create.bind(this),
			columns: [
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'NAME', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: true }
				},
				{
					columnName: 'CREDENTIALS TYPE', columnAttribute: 'credentialsType', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: true },
					columnEditor: this.credentialsTypeFormat.bind(this)
				},
				{
					columnName: 'QUOTA', columnAttribute: 'quota', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.quotaformat.bind(this)
				},
				{
					columnName: 'USAGE', columnAttribute: 'status', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.usageFormat.bind(this)
				},
				/*{
					columnName: 'CREATED ON', columnAttribute: 'create_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'CREATED BY', columnAttribute: 'create_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}, */
				{
					columnName: 'MODIFIED ON', columnAttribute: 'modify_date', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true },
					columnEditor: this.formatDate.bind(this)
				},
				{
					columnName: 'MODIFIED BY', columnAttribute: 'modify_user', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true,
			actionTypes: [
				{ icon: 'edit', urlGeneration: this.update },
				{ icon: 'delete', action: this.delete.bind(this) }
			]
		};
	}

	private create() {
		this.router.navigate(['api', 'api-token', 'update']);
	}

	private update(element: any): any[] {
		return ['api', 'api-token', 'update', element.id];
	}

	private delete(element: any): void {
		this.tablesApiTokenService.delete(element.id).subscribe(() => {
			this.plugToastService.showToast(3000, `Api token '${element.name}' deleted correctly`);
			this.reloadEvent.emit();
		});
	}

	private formatDate(date: number) {
		return this.dateInternalService.getFormatDateTime(date);
	}

	private quotaformat(quota: ApiTokenFromDb['quota']) {
		let calls = 'Unlimited calls';
		let data = 'Unlimited data';
		if (quota.intervalCalls && quota.intervalCalls !== 'any' && quota.intervalCallsVal && quota.calls) {
			calls = `Every ${quota.intervalCallsVal > 1 ? quota.intervalCallsVal : ''} ` +
			`${quota.intervalCalls}${quota.intervalCallsVal > 1 ? 's' : ''}: ${this.numFmt(quota.calls)} calls`;
		}
		if (quota.intervalMb && quota.intervalMb !== 'any' && quota.intervalMbVal && quota.mb) {
			data = `Every ${quota.intervalMbVal > 1 ? quota.intervalMbVal : ''} ` +
			`${quota.intervalMb}${quota.intervalMbVal > 1 ? 's' : ''}: ${this.numFmt(quota.mb)} mb`;
		}
		return `${calls} / ${data}`;
	}

	private usageFormat(status: ApiTokenFromDb['status']) {
		return `${this.numFmt(status.callsMade)} calls / ${this.numFmt(status.mbTrasnferd)} mb`;
	}

	private numFmt(num: number) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}

	private credentialsTypeFormat(credentialsType: ApiTokenFromDb['credentialsType']) {
		return credentialsType === 'jwt' ? 'JWT' : credentialsType === 'token' ? 'Token' : 'Basic auth';
	}


}
