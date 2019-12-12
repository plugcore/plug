import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { DateInternalService } from '../../../../services/date/date.internal.service';

@Component({
	selector: 'plug-table-filter-date',
	templateUrl: './table-filter-date.component.html',
	styleUrls: ['./table-filter-date.component.scss']
})
export class TableFilterDateComponent implements OnInit, OnDestroy {

	@Input() public currentValue: any;
	@Input() public data: any;
	@Input() parentSubject: Subject<any>;
	@Output() public eventEemiter = new EventEmitter<any>();
	public formGroup: FormGroup;
	public values: any;

	constructor(private dateInternalService: DateInternalService) {
	}

	ngOnInit() {
		this.parentSubject.subscribe(() => {
			this.formGroup.reset();
		});
		this.createForm();
	}

	ngOnDestroy() {
		this.parentSubject.unsubscribe();
	}

	/**
	 * Emits values from input event
	 * @param type
	 * @param value
	 */
	public fromInput(type: string, value) {
		if (!this.isDateOrUndefined(value)) {
			this.formGroup.controls[type].setErrors({ error: {} });
			this.values[type] = '';
			this.eventEemiter.emit([this.data.filterId, this.composeDate(this.values)]);
		} else {
			this.formGroup.controls[type].setErrors(null);
			if (value !== '' && value !== undefined) {
				const v = value.split('/');
				this.values[type] = new Date(new Date(+v[2], +v[0] - 1, +v[1]));
			} else {
				this.values[type] = '';
			}
			this.eventEemiter.emit([this.data.filterId, this.composeDate(this.values)]);
		}
	}

	/**
	 * Emits values from form group event
	 * @param type
	 */
	public fromFormGroup(type: string) {
		this.values[type] = this.formGroup.controls[type].value;
		this.eventEemiter.emit([this.data.filterId, this.composeDate(this.values)]);
	}

	/**
	 * Creates the form group
	 */
	private createForm() {
		if (this.currentValue) {
			this.currentValue = this.descomposeDate(this.currentValue);
			this.currentValue['timeStart'] = this.currentValue['timeStart'];
			this.currentValue['timeEnd'] = this.currentValue['timeEnd'];
			this.currentValue['dateStart'] = this.numberToDate(this.currentValue['dateStart']);
			this.currentValue['dateEnd'] = this.numberToDate(this.currentValue['dateEnd']);
			this.values = this.currentValue;
			this.formGroup = new FormGroup({
				timeStart: new FormControl(this.currentValue['timeStart']),
				timeEnd: new FormControl(this.currentValue['timeEnd']),
				dateStart: new FormControl(this.currentValue['dateStart']),
				dateEnd: new FormControl(this.currentValue['dateEnd'])
			});
		} else {
			this.formGroup = new FormGroup({
				timeStart: new FormControl(''),
				timeEnd: new FormControl(''),
				dateStart: new FormControl(''),
				dateEnd: new FormControl('')
			});
			this.values = this.formGroup.value;
		}
	}

	/**
	 * Sets the hours and minutes to the timeStart and timeEnd and valides that timeStart is before than timeEnd
	 * @param values
	 */
	private composeDate(values: any[]): any {
		const newValue = {
			timeStart: '',
			timeEnd: ''
		};
		if (values['dateStart'] !== '' && values['timeStart'] !== '') {
			newValue.timeStart = values['dateStart'].hours(+values['timeStart'].substr(0, 2)).minutes(+values['timeStart'].substr(3, 5)).valueOf();
		} else {
			if (values['dateStart'] !== '') {
				newValue.timeStart = values['dateStart'].valueOf();
			}
		}
		if (values['dateEnd'] !== '' && values['timeEnd'] !== '') {
			newValue.timeEnd = values['dateEnd'].hours(+values['timeEnd'].substr(0, 2)).minutes(+values['timeEnd'].substr(3, 5)).valueOf();
		} else {
			if (values['dateEnd'] !== '') {
				newValue.timeEnd = values['dateEnd'].valueOf();
			}
		}
		if (!this.timeStartIsBefore(newValue)) {
			this.formGroup.controls['timeEnd'].setErrors({ 'notBefore': true });
			this.formGroup.controls['dateEnd'].setErrors({ 'notBefore': true });
		} else if (this.formGroup.controls['dateEnd'].valid || this.formGroup.controls['dateEnd'].errors['notBefore']) {
			this.formGroup.controls['timeEnd'].setErrors(null);
			this.formGroup.controls['dateEnd'].setErrors(null);
		}
		return newValue;
	}

	/**
	 * Gets the hours and minutes from the timeStart and the timeEnd and sets the dates to them
	 * @param values
	 */
	private descomposeDate(values: any[]): any {
		const newValues = {
			dateStart: '',
			dateEnd: '',
			timeStart: '',
			timeEnd: ''
		};
		if (values['timeStart'] !== '') {
			newValues.dateStart = values['timeStart'];
			newValues.timeStart = this.numberToHhmm(values['timeStart']);
		}
		if (values['timeEnd'] !== '') {
			newValues.dateEnd = values['timeEnd'];
			newValues.timeEnd = this.numberToHhmm(values['timeEnd']);
		}
		return newValues;
	}

	/**
	 * Returns true if timeStart is before than timeEnd
	 * @param newValue
	 */
	private timeStartIsBefore(newValue: any): boolean {
		if (newValue['timeStart'] === '' || newValue['timeEnd'] === '') {
			return true;
		} else {
			return newValue['timeStart'].valueOf() <= newValue['timeEnd'].valueOf();
		}
	}

	/**
	 * Returns true if is date or undefined
	 * @param value
	 */
	private isDateOrUndefined(value: string) {
		if (value !== undefined && value !== '') {
			const v = value.split('/');
			return new Date(+v[2], +v[1] - 1, +v[0]).toString() !== 'Invalid Date';
		} else {
			return true;
		}
	}

	/**
	 * Converts a number to date
	 * @param date
	 */
	private numberToDate(date: any) {
		if (date !== '') {
			return this.dateInternalService.numberToDate(date);
		} else {
			return '';
		}
	}

	/**
	 * Converts a number to the format hh:mm
	 * @param date
	 */
	private numberToHhmm(date: any) {
		if (date !== '') {
			return this.dateInternalService.numberToHhmm(date);
		} else {
			return '';
		}
	}

}
