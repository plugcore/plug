import { Component, OnInit } from '@angular/core';
import { DASHBOARD_MENU } from './dashboard-menu.model';

@Component({
	selector: 'plug-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	categories: any[] = DASHBOARD_MENU;

	constructor(
	) { }

	ngOnInit() {

	}

}
