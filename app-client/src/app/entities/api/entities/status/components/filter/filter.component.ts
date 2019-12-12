import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { of } from 'rxjs';
import { ITablesConfig, ITablesResults } from '../../../../../../components/table/interfaces/table.interface';
import { ApiStatusFilterCheckboxComponent } from '../filter-checkbox/filter-checkbox.component';
import { TablesApiTokenService } from '../../../api-token/services/api-token.service';

@Component({
	selector: 'plug-api-status-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class ApiStatusFilterComponent implements OnInit {

	@Input() public data: {
		optionSelected: string;
		apisSelected: string[];
		tokensSelected: string[];
		startDate: Date;
		endDate: Date;
		apis: any[];
	};
	@Output() public eventEemiter = new EventEmitter<any>();

	public optionSelectedControl: FormControl;
	public initDateControl: FormControl;
	public finalDateControl: FormControl;
	public apisSelected: FormControl;

	private reloadEvent = new EventEmitter<void>();
	public tableConfig: ITablesConfig;
	public tokenTables: ITablesConfig;

	private apisFormGroup: FormGroup = new FormGroup({});
	private tokensFormGroup: FormGroup = new FormGroup({});
	private tableData: any[];
	private tokenTableData: any[];

	constructor(
		public dialogRef: MatDialogRef<ApiStatusFilterComponent>,
		private tablesApiTokenService: TablesApiTokenService
	) { }

	ngOnInit() {
		this.optionSelectedControl = new FormControl(this.data.optionSelected);
		this.initDateControl = new FormControl(this.data.startDate);
		this.finalDateControl = new FormControl(this.data.endDate);
		this.initTable();
	}

	public closeDialog() {
		this.dialogRef.close();
	}

	public applyFilters() {
		const dataOutput = {
			optionSelected: this.optionSelectedControl.value,
			apisSelected: this.tableData.filter(d => d.selected).map(d => d.name),
			tokensSelected: this.tokenTableData.filter(d => d.selected).map(d => d.name),
			startDate: this.initDateControl.value,
			endDate: this.finalDateControl.value
		};
		this.eventEemiter.emit(dataOutput);
	}

	private initTable() {
		this.tableData = this.data.apis.map(api => ({
			name: api.apiName,
			method: api.apiMethod,
			formGroup: this.apisFormGroup,
			selected: this.data.apisSelected.includes(api.apiName)
		}));
		this.tokenTableData = this.tablesApiTokenService.data.map(token => ({
			id: token.id,
			name: token.name,
			formGroup: this.apisFormGroup,
			selected: this.data.tokensSelected.includes(token.name)
		}));
		this.tableConfig = {
			searchMethod: this.search.bind(this),
			columns: [
				{
					columnName: 'SHOW', columnAttribute: 'show', columnSort: false,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					columnComponent: ApiStatusFilterCheckboxComponent
				},
				{
					columnName: 'Name', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'Method', columnAttribute: 'method', columnSort: true,
					columnExpansion: { desktop: false, tablet: true, mobile: true }
				}
			],
			reloadEvent: this.reloadEvent,
			pagination: true
		};
		this.tokenTables = {
			searchMethod: this.searchTokens.bind(this),
			columns: [
				{
					columnName: 'SHOW', columnAttribute: 'show', columnSort: false,
					columnExpansion: { desktop: false, tablet: false, mobile: false },
					columnComponent: ApiStatusFilterCheckboxComponent
				},
				{
					columnName: 'ID', columnAttribute: 'id', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: false }
				},
				{
					columnName: 'NAME', columnAttribute: 'name', columnSort: true,
					columnExpansion: { desktop: false, tablet: false, mobile: true }
				},
			],
			reloadEvent: this.reloadEvent,
			pagination: true
		};
	}

	private search(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number) {
		this.applySort(this.tableData, activeSort, direction);
		const newData = this.applyPagination(this.tableData, pageIndex, pageSize);
		const result: ITablesResults<any> = {
			data: newData,
			total: this.data.apis.length
		};
		return of(result);
	}

	private searchTokens(activeSort: string, direction: number, formValue: string[], pageIndex: number, pageSize: number) {
		this.applySort(this.tokenTableData, activeSort, direction);
		const newData = this.applyPagination(this.tokenTableData, pageIndex, pageSize);
		const result: ITablesResults<any> = {
			data: newData,
			total: this.data.apis.length
		};
		return of(result);
	}

	private applySort(data: any[], activeSort: string, direction: number) {
		if (activeSort !== undefined) {
			if (direction === 1) {
				data.sort((a, b) => {
					if (a[activeSort] < b[activeSort]) {
						return -1;
					}
					if (a[activeSort] > b[activeSort]) {
						return 1;
					}
					return 0;
				});
			} else {
				data.sort((a, b) => {
					if (a[activeSort] > b[activeSort]) {
						return -1;
					}
					if (a[activeSort] < b[activeSort]) {
						return 1;
					}
					return 0;
				});
			}
		}
	}

	private applyPagination(data: any[], pageIndex: number, pageSize: number): any[] {
		const temp: any[] = [];

		for (let i = pageIndex * pageSize; i < ((pageIndex * pageSize) + pageSize) && (i < data.length); i++) {
			temp.push(data[i]);
		}
		return temp;
	}

}
