import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'plug-api-status-filter-checkbox',
	templateUrl: './filter-checkbox.component.html',
	styleUrls: ['./filter-checkbox.component.scss']
})
export class ApiStatusFilterCheckboxComponent implements OnInit {

	@Input() public currentValue: { formGroup: FormGroup; name: string; selected: boolean };

	public ngOnInit() {
		this.currentValue.formGroup.addControl(this.currentValue.name, new FormControl(this.currentValue.selected));
		this.currentValue.formGroup.get(this.currentValue.name).valueChanges.subscribe(val => {
			this.currentValue.selected = val;
		});
	}

}
