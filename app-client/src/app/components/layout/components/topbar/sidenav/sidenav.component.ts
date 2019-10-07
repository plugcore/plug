import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

import { IRouteConf, LayoutRouterService } from '../../../services/router/router.internal.service';

@Component({
  selector: 'plug-topbar-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class TopbarSidenavComponent implements OnInit {

  @Input() notificPanel;

	public routeConf: IRouteConf;

	constructor(private routerService: LayoutRouterService, @Inject(LOCALE_ID) protected localeId: string) {
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.routeConf = routeConf;
			console.log(this.routeConf);

		});
	}

	ngOnInit() {
	}

	toggleNotific() {
		this.notificPanel.toggle();
	}

	toggleSidenav() {
		if (this.routeConf.sidebarStyle === 'closed') {
			this.routeConf.sidebarStyle = 'full';
		} else {
			this.routeConf.sidebarStyle = 'closed';
		}
		this.routerService.publishLayoutChange(this.routeConf);
	}

	toggleCollapse() {
		if (this.routeConf.sidebarStyle === 'compact') {
			this.routeConf.sidebarStyle = 'full';
		} else {
			this.routeConf.sidebarStyle = 'compact';
		}
		this.routerService.publishLayoutChange(this.routeConf, {transitionClass: true});
	}

}
