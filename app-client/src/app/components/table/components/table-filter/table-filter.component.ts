import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewContainerRef, QueryList, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'plug-table-filter',
	templateUrl: './table-filter.component.html',
	styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit, AfterViewInit {

	locale: string;
	public data: any;
	@Output() public eventEmmiter = new EventEmitter<any>();
	@ViewChildren('filters', { read: ViewContainerRef }) public templates: QueryList<ViewContainerRef>;
	parentSubject: Subject<any> = new Subject();

	constructor(private resolver: ComponentFactoryResolver,
		public thisDialogRef: MatDialogRef<TableFilterComponent>) {
	}

	ngOnInit() {
		this.thisDialogRef.keydownEvents().subscribe((event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				this.sendFiltered();
			}
		});
	}

	/**
	 * Notifies date filter components to reset them filters
	 */
	notifyChildren() {
		this.parentSubject.next();
	}

	/**
	 * Sets data from date filter
	 * @param data
	 */
	reciveData(data: any) {
		this.data['formGroup'].controls[data[0]].setValue(data[1]);
	}

	/**
	 * Create components asynchronously
	 */
	ngAfterViewInit() {
		// update properties asynchronously, to prevent the values will not be updated when the verification loop is running
		// (the verification is performed synchronously). More info:
		// https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
		setTimeout(() => {
			this.createComponents(false);
		});
	}

	/**
	 * Reset all the filters
	 */
	public resetFilters(): void {
		this.data['formGroup'].reset();
		this.setHiddenFormGroupsValues();
		this.createComponents(true);
		this.notifyChildren();
	}

	/**
	 * Notifies that filters are sended
	 */
	public sendFiltered(): void {
		this.thisDialogRef.close({ filtered: true });
	}

	/**
	 * Create the components and put them into the templates
	 */
	private createComponents(reset: boolean): void {
		let i = 0;

		this.templates.forEach(template => {
			for (let j = i; j < this.data['tablesConfig'].filters.length; j++) {
				const filter = this.data['tablesConfig'].filters[j];
				if (filter.filterComponent) {
					template.clear();
					const factory = this.resolver.resolveComponentFactory(filter.filterComponent);
					const componentRef = template.createComponent(factory);
					if (reset) {
						componentRef.instance['currentValue'] = null;
					} else {
						componentRef.instance['currentValue'] = this.data['formGroup'].get(filter.filterId).value;
					}
					if (filter.filterValue) {
						componentRef.instance['filterValue'] = filter.filterValue;
					}
					componentRef.instance['eventEmmiter'].subscribe((value) => {
						this.data['formGroup'].get(filter.filterId).setValue(value);
						if (this.data['formGroup'].controls[filter.filterId].valid) {
							this.data['formGroup'].controls[filter.filterId].setErrors(null);
						} else {
							this.data['formGroup'].controls[filter.filterId].setErrors({ 'incorrect': true });
						}
					});
					i = j + 1;
					j = this.data['tablesConfig'].filters.length;
				}
			}
		});
	}

	/**
	 * Sets hidden form group values
	 */
	private setHiddenFormGroupsValues(): void {
		this.data['tablesConfig'].filters.forEach(filter => {
			if (filter.filterHiddenValue !== undefined) {
				this.data['formGroup'].controls[filter.filterId].setValue(filter.filterHiddenValue);
			}
		});
	}

}
