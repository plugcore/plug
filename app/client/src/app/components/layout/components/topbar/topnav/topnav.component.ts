import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LayoutMenuService } from '../../../services/menu/menu.internal.service';
import { LayoutRouterService } from '../../../services/router/router.internal.service';

@Component({
	selector: 'plug-topbar-topnav',
	templateUrl: './topnav.component.html',
	styleUrls: ['./topnav.component.scss']
})
export class TopbarTopnavComponent implements OnInit, OnDestroy {

	routeConf: any;
	menuItems: any;
	menuItemSub: Subscription;
	egretThemes: any[] = [];
	@Input() notificPanel;
	constructor(
		private routerService: LayoutRouterService,
		private menuService: LayoutMenuService
	) {
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.routeConf = routeConf;
		});

		this.menuItemSub = this.menuService.menuItems$.subscribe(res => {
			res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
			const limit = 4;
			const mainItems: any[] = res.slice(0, limit);
			if (res.length <= limit) {
				return this.menuItems = mainItems;
			}
			const subItems: any[] = res.slice(limit, res.length - 1);
			mainItems.push({
				name: 'More',
				type: 'dropDown',
				tooltip: 'More',
				icon: 'more_horiz',
				sub: subItems
			});
			this.menuItems = mainItems;
		});
	}

	ngOnInit() {
	}
	ngOnDestroy() {
		this.menuItemSub.unsubscribe();
	}
	toggleNotific() {
		this.notificPanel.toggle();
	}
	toggleSidenav() {
		if (this.routeConf.sidebarStyle === 'closed') {
			this.routeConf.sidebarStyle = 'full';
			return this.routerService.publishLayoutChange(this.routeConf);
		}
		this.routeConf.sidebarStyle = 'closed';
		this.routerService.publishLayoutChange(this.routeConf);
	}

}
