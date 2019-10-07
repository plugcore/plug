import { Component, OnInit } from '@angular/core';

import { LayoutMenuService } from '../../../services/menu/menu.internal.service';

@Component({
	selector: 'plug-sidebar-mobile',
	templateUrl: './mobile.component.html',
	styleUrls: ['./mobile.component.scss']
})
export class SidebarMobileComponent implements OnInit {

	public menuItems: any[];
	constructor(
		private menuService: LayoutMenuService) { }

	ngOnInit() {
		this.menuService.menuItems$.subscribe(menuItem => {
			// Checks item list has any icon or separator type.
			this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
		});
	}
}
