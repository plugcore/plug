import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'plug-api-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class ApiStatusComponent implements OnInit {

	title = 'Fruits distribution';
	type = 'ComboChart';
	data = [
		['Apples', 3, 2, 2.5],
		['Oranges', 2, 3, 2.5],
		['Pears', 1, 5, 3],
		['Bananas', 3, 9, 6],
		['Plums', 4, 2, 3]
	];
	columnNames = ['Fruits', 'Jane', 'Jone', 'Average'];
	options = {
		hAxis: {
			title: 'Person'
		},
		vAxis: {
			title: 'Fruits'
		},
		seriesType: 'bars',
		series: { 2: { type: 'line' } }
	};
	width = 1200;
	height = 600;

	constructor(
	) {
	}

	ngOnInit() {
	}

}
