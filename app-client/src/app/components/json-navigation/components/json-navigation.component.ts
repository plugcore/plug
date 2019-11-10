import { Component, Input, OnInit } from '@angular/core';
import { PlugDialogService } from '../../dialog/services/dialog.service';
import { JsonNavigationJsonViewComponent } from './json-view/json-view.component';

@Component({
	selector: 'plug-json-navigation',
	templateUrl: './json-navigation.component.html',
	styleUrls: ['./json-navigation.component.scss']
})
export class JsonNavigationComponent implements OnInit {

	@Input() data;
	@Input() hideControls: boolean;
	breadcrumb = [];
	keyProperties;
	properties;

	constructor(
		private plugDialogService: PlugDialogService
	) {

	}

	ngOnInit() {
		this.properties = this.data;
		this.keyProperties = Object.keys(this.data);
	}

	navigate(index?: number) {
		let newData = this.data;
		if (index >= 0) {
			for (let i = 0; i <= index; i++) {
				newData = newData[this.breadcrumb[i]];
			}
			for (let i = this.breadcrumb.length - 1; i > index; i--) {
				this.breadcrumb.pop();
			}
		} else {
			this.breadcrumb = [];
		}
		this.properties = newData;
		this.keyProperties = Object.keys(newData);
	}

	showProperties(property) {
		this.breadcrumb.push(property);
		this.properties = this.properties[property];
		this.keyProperties = Object.keys(this.properties);
	}

	viewJSON() {
		this.plugDialogService.openModal(JsonNavigationJsonViewComponent, 'JSON View', this.data);
	}

	isString(property) {
		return typeof property === 'string';
	}

	isBoolean(property) {
		return typeof property === 'boolean';
	}

	isNumber(property) {
		return typeof property === 'number';
	}

	isObject(property) {
		return typeof property === 'object' && property !== null;
	}

	isNull(property) {
		return typeof property === 'object' && property === null;
	}

	isUndefined(property) {
		return typeof property === 'undefined';
	}

}
