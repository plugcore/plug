import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IRouteConf, LayoutRouterService } from '../services/router/router.internal.service';

@Component({
	selector: 'plug-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	public routeConf: IRouteConf = <IRouteConf>{};

	constructor(
		private routerService: LayoutRouterService,
		private router: Router) {
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.routeConf = routeConf;
		});

		// Close sidenav after route change in mobile
		this.router.events.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((routeChange: NavigationEnd) => {
				if (this.isSm()) {
					this.closeSidebar();
				}
			});
	}

	ngOnInit() {
		this.modifySidebarStyle();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.modifySidebarStyle();
	}

	modifySidebarStyle() {
		if (this.isSm()) {
			this.routeConf.isMobile = true;
			this.routeConf.sidebarStyle = 'closed';
		} else {
			this.routeConf.isMobile = false;
			this.routeConf.sidebarStyle = 'full';
		}
		this.routerService.publishLayoutChange(this.routeConf);
	}

	closeSidebar() {
		this.routeConf.sidebarStyle = 'closed';
		this.routerService.publishLayoutChange(this.routeConf);
	}

	isSm() {
		return window.matchMedia(`(max-width: 959px)`).matches;
	}
}
