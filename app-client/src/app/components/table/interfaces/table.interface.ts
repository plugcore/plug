import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

/**
 * Tables configuration
 */
export interface ITablesConfig {
	columns: ITablesColumn[];
	searchMethod: (activeSort: string, direction: number, formValue: string[], pageIndex?: number, pageSize?: number) =>
		Observable<ITablesResults>;
	createMethod?: () => void;
	reloadEvent?: EventEmitter<void>;
	pagination?: boolean;
	hideFirstLastPage?: boolean;
	pageSize?: number;
	pageOptions?: number[];
	emptyMessage?: string;
	actionTypes?: (ITablesActionType | ITablesURLActionType)[];
	filters?: (ITablesDefaultFilter | ITablesComponentFilter | ITablesHiddenFilter)[];
}


/**
 * Tables column configuration
 */
export interface ITablesColumn {
	columnName: string;
	columnAttribute: string;
	columnSort?: boolean;
	columnFilter?: boolean;
	columnExpansion?: ITablesExpansion;
	columnFilterHint?: string;
	columnComponent?: any;
	columnEditor?: (value: any, element: any) => any;
	ngClass?: (element: any) => any;
}

/**
 * Current table data and the total number of the table data
 */
export interface ITablesResults<T = any> {
	total: number;
	data: T[];
}

export interface ITableBasicAction {
	icon: string;
	tooltip?: string;
	hideMethod?: (element: any) => boolean;
}

/**
 * Table action type
 */
export interface ITablesActionType extends ITableBasicAction {
	action: (element: any) => void;
}

/**
 * URL action type
 */
export interface ITablesURLActionType extends ITableBasicAction {
	urlGeneration: (element: any) => any[];
}

/**
 * Default filter
 */
export interface ITablesDefaultFilter {
	filterId: string;
	filterType: IFilterType;
	filterName?: string;
	filterHint?: string;
}

/**
 * Filter with a component
 */
export interface ITablesComponentFilter {
	filterId: string;
	filterComponent: any;
	filterValue?: any;
}

/**
 * Hidden filter
 */
export interface ITablesHiddenFilter {
	filterId: string;
	filterHiddenValue: any;
}

/**
 * Expansion of the columns
 */
export interface ITablesExpansion {
	desktop?: boolean;
	tablet?: boolean;
	mobile?: boolean;
}

export interface ITablesComFilComponent {
	currentValue: any;
	filterValue: any;
	eventEemiter: EventEmitter<any>;
	sendFilter(value: any): void;
}

/**
 * Expansion of the columns for the tables component
 */
export interface Expansion {
	desktop: boolean;
	tablet: boolean;
	mobile: boolean;
}

/**
 * Types of default filters
 */
export enum IFilterType {
	string,
	number,
	boolean,
	Date,
	DateStartAndEnd,
	time
}

/**
 * Screen types
 */
export enum ScreenTypes {
	mobile,
	tablet,
	desktop
}
