import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'plug-sidebar-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class SidebarNavComponent implements OnInit {

	@Input('items') public menuItems: any[] = [];
	@Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
	@Input('iconMenuTitle') public iconTypeMenuTitle: string;

	constructor() { }

	ngOnInit() {
	}

}
