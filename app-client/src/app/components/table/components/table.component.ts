import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver,
	Directive, ElementRef, Input, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { PlugDialogService } from '../../dialog/services/dialog.service';
import { PlugOverlayService } from '../../overlay/services/overlay.service';
import { PlugToastService } from '../../toast/services/toast.service';
import { Expansion, IFilterType, ITablesColumn, ITablesComponentFilter, ITablesConfig,
	ITablesDefaultFilter, ITablesHiddenFilter, ITablesResults, ScreenTypes } from '../interfaces/table.interface';
import { TableFilterComponent } from './table-filter/table-filter.component';

@Component({
	selector: 'plug-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
		trigger('rotatedState', [
			state('collapsed', style({ transform: 'rotate(0)' })),
			state('expanded', style({ transform: 'rotate(-180deg)' })),
			transition('expanded => collapsed', animate('225ms ease-out')),
			transition('collapsed => expanded', animate('225ms ease-in'))
		])
	]
})
export class TableComponent implements OnInit {

	@Input() public tablesConfig: ITablesConfig;
	@ViewChild(MatPaginator, { static: false}) public paginator: MatPaginator;
	@ViewChild(MatSort, { static: true}) public sort: MatSort;
	@ViewChildren('templates', { read: ViewContainerRef }) public templates: QueryList<ViewContainerRef>;
	public columnAttributes: string[];
	public data: any[];
	public lenght: number;
	public expandedElement: any;
	public expansion: Expansion;
	public isFirst = true;
	public thereAreFilters = false;
	private formGroup: FormGroup;
	private screenType: ScreenTypes;
	columnExpansions: any = {};

	constructor(public router: Router,
		private fb: FormBuilder,
		private resolver: ComponentFactoryResolver,
		private genericModalService: PlugDialogService,
		private overlayService: PlugOverlayService,
		private toastService: PlugToastService,
		private ref: ChangeDetectorRef
	) {
		this.formGroup = this.fb.group({});
		this.data = [];
		this.lenght = 0;
		this.columnAttributes = [];
		this.expansion = { desktop: false, mobile: false, tablet: false };
	}

	ngOnInit() {
		this.screenType = this.getScreenWidthType();
		this.setColumnExpansions();
		fromEvent(window, 'resize').pipe(debounce(() => timer(500))).subscribe(() => {
			this.screenType = this.getScreenWidthType();
			this.setColumnExpansions();
			this.columnAttributes = [];
			this.tablesConfig.columns.forEach(column => {
				if (!this.columnExpansions[column.columnAttribute]) {
					this.columnAttributes.push(column.columnAttribute);
				}
			});
		});

		this.setInitialConfiguration();
		if (this.tablesConfig.reloadEvent) {
			this.tablesConfig.reloadEvent.subscribe(() => {
				this.updateData();
			});
		}
	}

	/**
	 * Sets the column expansions
	 */
	setColumnExpansions(): any {
		for (const column of this.tablesConfig.columns) {
			let result = false;
			if (column.columnExpansion) {
				if (this.screenType === 0) {
					result = column.columnExpansion.mobile;
				} else if (this.screenType === 1) {
					result = column.columnExpansion.tablet;
				} else {
					result = column.columnExpansion.desktop;
				}
			}
			this.columnExpansions[column.columnAttribute] = result;
		}
		this.ref.markForCheck();
		this.columnExpansions = Object.assign({}, this.columnExpansions);
	}

	/**
	 * Sets expansion to a row
	 * @param element
	 */
	public setExpansion(element: any) {
		if (this.thereIsExpansion()) {
			if (this.expandedElement === element) {
				this.expandedElement = undefined;
			} else {
				this.expandedElement = element;
			}
		}
	}

	/**
	 * Return true if there is expansion
	 */
	public thereIsExpansion() {
		if (this.screenType === 0) {
			return this.expansion.mobile;
		} else if (this.screenType === 1) {
			return this.expansion.tablet;
		} else {
			return this.expansion.desktop;
		}
	}

	/**
	 * Desactivate a parent event
	 * @param event
	 */
	public onEvent(event) {
		event.stopPropagation();
	}

	/**
	 * Update table data when pagination changes
	 * @param paginator
	 */
	public updateData(): void {
		let activeSort;
		let directionSort = '-1';
		if (this.sort.direction.length !== 0) {
			activeSort = this.sort.active;
			directionSort = this.sort.direction === 'desc' ? '1' : directionSort;
		}
		if (this.tablesConfig.pagination === true) {
			this.doSearch(activeSort, directionSort, this.formGroup.value, this.paginator.pageIndex, this.paginator.pageSize);
		} else {
			this.doSearch(activeSort, directionSort, this.formGroup.value);
		}
	}

	/**
	 * Return true if the string contains '.'
	 * @param columnName
	 */
	public thereAreLevels(columnName: string): boolean {
		return columnName.includes('.');
	}

	/**
	 * Returns true if the empty message has to be shown
	 * @param data
	 * @param isFirst
	 */
	public showEmptyMessage(data, isFirst): boolean {
		if (data) {
			return data.length === 0 && !isFirst;
		} else {
			return true;
		}
	}

	/**
	 * Get object atribute depending on a string
	 * @param columnName
	 * @param object
	 */
	public getObjectAttribute(columnAttribute, object): any {
		const attributes: number[] = columnAttribute.split('.');
		for (let i = 0; i < attributes.length; i++) {
			object = object[attributes[i]];
		}
		return object;
	}

	/**
	 * Apply method of the result
	 * @param value
	 * @param element
	 * @param metodo
	 */
	public applyEditor(value: string, element: any, columnEditor: (value: string, element: any) => string): string {
		return columnEditor(value, element);
	}

	/**
	 * Execute a table action
	 * @param element
	 * @param action
	 * @param urlGeneration
	 */
	public executeAction(element: any, action: (element) => void, urlGeneration: (element: any) => any[]): void {
		if (action) {
			action(element);
		} else {
			this.router.navigate(urlGeneration(element));
		}
	}

	/**
 	 * Open the filters modal
 	 */
	public openFilters(): void {
		const tempFormValues = this.formGroup.value;
		const data = {
			tablesConfig: this.tablesConfig,
			formGroup: this.formGroup
		};
		this.genericModalService.openModal<boolean>(
			TableFilterComponent, 'Filters', data, 'activity-dialog', 600, false, true
		).subscribe(filtered => {
			if (filtered) {
				if (this.paginator) {
					this.paginator.pageIndex = 0;
				}
				this.updateData();
			} else {
				Object.keys(tempFormValues).forEach(item => {
					if (!tempFormValues[item]) {
						tempFormValues[item] = '';
					}
				});
				this.formGroup.setValue(tempFormValues);
			}
		});
	}

	/**
	 * Calls the create method
	 */
	public create() {
		if (this.tablesConfig.createMethod) {
			this.tablesConfig.createMethod();
		}
	}

	/**
	 * Calls the hide method of the actions
	 * @param actionType
	 * @param element
	 */
	public checkHideMethod(actionType, element) {
		if (actionType.hideMethod) {
			return actionType.hideMethod(element);
		} else {
			return true;
		}
	}

	/**
	 * Returns the screen width type
	 */
	private getScreenWidthType(): ScreenTypes {
		const width = window.innerWidth;
		if (width < 481) {
			return ScreenTypes.mobile;
		} else if (width < 1024) {
			return ScreenTypes.tablet;
		} else {
			return ScreenTypes.desktop;
		}
	}

	/**
	 * Create the form controls of the filters modal
	 */
	private createFormGroup(): void {
		this.createColumnFilters();
		if (this.tablesConfig.filters) {
			this.tablesConfig.filters.forEach(filter => {
				this.formGroup.addControl(filter.filterId, new FormControl());
			});
		}
	}

	/**
	 * Create the column filters
	 */
	private createColumnFilters(): void {
		if (!this.data || this.data.length <= 0) {
			return;
		}
		let isFirst = true;
		let previousFilters;
		this.tablesConfig.columns.forEach(column => {
			if (column.columnFilter === true) {
				if (!this.tablesConfig.filters) {
					this.tablesConfig.filters = [];
				} else {
					if (isFirst) {
						previousFilters = this.tablesConfig.filters;
						this.tablesConfig.filters = [];
						isFirst = false;
					}
				}
				let type: string;
				if (this.thereAreLevels(column.columnAttribute)) {
					if (this.getObjectAttribute(column.columnAttribute, this.data[0]) instanceof Date) {
						type = 'Date';
					} else {
						type = typeof this.getObjectAttribute(column.columnAttribute, this.data[0]) === 'undefined'
							? 'string' : typeof this.getObjectAttribute(column.columnAttribute, this.data[0]);
					}
				} else {
					if (this.data[0][column.columnAttribute] instanceof Date) {
						type = 'Date';
					} else {
						type = typeof this.data[0][column.columnAttribute] === 'undefined' ? 'string' : typeof this.data[0][column.columnAttribute];
					}
				}
				this.tablesConfig.filters.push({
					filterId: column.columnAttribute,
					filterType: IFilterType[type],
					filterName: column.columnName,
					filterHint: column.columnFilterHint
				});
			}
		});
		if (previousFilters) {
			previousFilters.forEach(filter => {
				this.tablesConfig.filters.push(filter);
			});
		}
		if (this.tablesConfig.filters) {
			this.tablesConfig.filters.forEach(filter => {
				if (!this.isTableHiddenFilter(filter)) {
					this.thereAreFilters = true;
				}
			});
		}
	}

	/**
	 * Check the table configuration and get the table data
	 */
	private setInitialConfiguration(): void {
		if (!this.tablesConfig.emptyMessage) {
			this.tablesConfig.emptyMessage = 'No results found.';
		}
		if (!this.tablesConfig.pagination) {
			this.tablesConfig.pagination = false;
		}
		this.createHiddenFormControls();
		if (!this.tablesConfig.pageOptions) {
			this.tablesConfig.pageOptions = [5, 10, 25, 100];
		}
		if (!this.tablesConfig.pageSize) {
			this.tablesConfig.pageSize = this.tablesConfig.pageOptions[1];
		}
		if (this.tablesConfig.actionTypes) {
			this.tablesConfig.columns.push({ columnName: 'Actions', columnAttribute: 'actions', columnSort: false, columnFilter: false });
		}
		this.tablesConfig.columns.forEach(column => {
			if (column.columnExpansion) {
				if (column.columnExpansion.desktop) {
					this.expansion['desktop'] = true;
				}
				if (column.columnExpansion.mobile) {
					this.expansion['mobile'] = true;
				}
				if (column.columnExpansion.tablet) {
					this.expansion['tablet'] = true;
				}
			}
		});
		if (this.expansion['desktop'] || this.expansion['mobile'] || this.expansion['tablet']) {
			const temp = this.tablesConfig.columns;
			this.tablesConfig.columns = [];
			this.tablesConfig.columns.push({ columnName: '', columnAttribute: 'expansion', columnSort: false, columnFilter: false });
			temp.forEach(column => {
				this.tablesConfig.columns.push(column);
			});
		}
		this.tablesConfig.columns.forEach(column => {
			if (!this.columnExpansions[column.columnAttribute]) {
				this.columnAttributes.push(column.columnAttribute);
			}
		});
		this.doFirstSearch();
	}

	/**
	 * Set the table data
	 * @param pageIndex
	 * @param pageSize
	 */
	private doSearch(activeSort: string, direction: string, formValue: string[], pageIndex?: number, pageSize?: number): void {
		this.overlayService.start('generictables.dosearch');
		this.tablesConfig.searchMethod(activeSort, direction, formValue, pageIndex, pageSize).subscribe((results: ITablesResults) => {
			this.lenght = results.total;
			this.data = results.data;
			this.createComponents(results.data, this);
			if (this.data && this.data.length > 0 &&
				(!this.tablesConfig.filters || this.tablesConfig.filters.length === 0)) {
				this.createColumnFilters();
			}
			this.overlayService.stop('generictables.dosearch');
		}, (error: Error) => {
			this.overlayService.stop('generictables.dosearch');
			this.toastService.showToast(7000, (error.name + error.message), ['error-snak-bar']);
		});
	}

	/**
	 * Set the table data and create the form groups
	 */
	private doFirstSearch(): void {
		if (this.tablesConfig.pagination === true) {
			this.overlayService.start('generictables.dofirstsearch');
			this.tablesConfig.searchMethod(undefined, undefined, this.formGroup.value, 0, this.tablesConfig.pageSize).subscribe(
				(results: ITablesResults) => {
					this.isFirst = false;
					this.lenght = results.total;
					this.data = results.data;
					this.createFormGroup();
					this.createComponents(results.data, this);
					this.overlayService.stop('generictables.dofirstsearch');
				}, (error: Error) => {
					this.overlayService.stop('generictables.dofirstsearch');
					this.toastService.showToast(7000, (error.name + error.message), ['error-snak-bar']);
				}
			);
		} else {
			this.overlayService.start('generictables.dofirstsearch');
			this.tablesConfig.searchMethod(undefined, undefined, this.formGroup.value).subscribe((results: ITablesResults) => {
				this.lenght = results.total;
				this.data = results.data;
				this.createFormGroup();
				this.createComponents(results.data, this);
				this.overlayService.stop('generictables.dofirstsearch');
			}, (error: Error) => {
				this.overlayService.stop('generictables.dofirstsearch');
				this.toastService.showToast(7000, (error.name + error.message), ['error-snak-bar']);
			});
		}
	}

	/**
	 * Creates the hidden form controls
	 */
	private createHiddenFormControls(): void {
		if (this.tablesConfig.filters) {
			this.tablesConfig.filters.forEach(filter => {
				if (this.isTableHiddenFilter(filter)) {
					this.formGroup.addControl(filter.filterId, new FormControl(filter.filterHiddenValue));
				}
			});
		}
	}

	/**
	 * Creates the columns components
	 * @param data
	 * @param that
	 */
	private createComponents(data: any, that: this): void {
		setTimeout(() => {
			let columnNumber = 0;
			that.tablesConfig.columns.forEach(column => {
				if (column.columnComponent) {
					for (let i = 0; i < data.length; i++) {
						const template = that.templates.toArray()[columnNumber + i];
						template.clear();
						const factory = this.resolver.resolveComponentFactory(column.columnComponent);
						const componentRef = template.createComponent(factory);
						componentRef.instance['currentValue'] = data[columnNumber + i];
					}
					columnNumber++;
				}
			});
		});
	}

	/**
	 * Return true if object is a ITablesHiddenFilter
	 * @param object
	 */
	private isTableHiddenFilter(object: (ITablesDefaultFilter | ITablesComponentFilter | ITablesHiddenFilter))
		: object is ITablesHiddenFilter {
		return 'filterHiddenValue' in object;
	}

}

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[showCoulmn]'
})
export class ShowColumnDirective implements AfterViewInit {
	@Input() public showInput: boolean;
	@Input() public thereIsExpansion: boolean;

	constructor(private elRef: ElementRef) {
	}
	ngAfterViewInit(): void {
		if (!this.showInput) {
			this.elRef.nativeElement.style.display = 'none';
		} else {
			this.elRef.nativeElement.style.display = 'table-cell';
		}
		if (this.elRef.nativeElement.classList.contains('cdk-column-expansion')) {
			if (!this.thereIsExpansion) {
				this.elRef.nativeElement.style.display = 'none';
			} else {
				this.elRef.nativeElement.style.display = 'table-cell';
			}
		}
	}

}

@Pipe({
	name: 'expansionFilter',
	pure: false
})
export class ExpansionFilterPipe implements PipeTransform {
	transform(items: ITablesColumn[], filter: any, inverted: boolean): any {
		if (!items || !filter) {
			return items;
		}
		const result = items.filter(column => {
			let resp = column.columnAttribute ? !filter[column.columnAttribute] : true;
			if (inverted) {
				resp = !resp;
			}
			return resp;
		});
		return result;
	}
}
