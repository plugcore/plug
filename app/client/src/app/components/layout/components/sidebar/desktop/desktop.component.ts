import { Component, OnInit } from '@angular/core';

import { LayoutMenuService } from '../../../services/menu/menu.internal.service';

@Component({
	selector: 'plug-sidebar-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.scss']
})
export class SidebarDesktopComponent implements OnInit {
	public iconTypeMenuTitle: string;
	public menuItems: any[];
	public hasIconTypeMenuItem: boolean;

	constructor(
		private menuService: LayoutMenuService) { }

	ngOnInit() {
		this.iconTypeMenuTitle = this.menuService.iconTypeMenuTitle;
		this.menuService.menuItems$.subscribe(menuItem => {
			this.menuItems = menuItem;
			// Checks item list has any icon or separator type.
			this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
		});
	}

}
