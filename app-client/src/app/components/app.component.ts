import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutRouterService } from './layout/services/router/router.internal.service';


@Component({
	selector: 'plug-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	appTitle = 'plugdata';
	pageTitle = '';

	constructor(
		private renderer: Renderer2,
		private router: Router,
		private activedRoute: ActivatedRoute,
		private routerService: LayoutRouterService,
		public title: Title
	) {
		this.renderer.addClass(document.body, 'egret-blue');
	}

	ngOnInit() {
		this.changePageTitle();
	}

	changePageTitle() {
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
			const routeParts = this.routerService.generateRouteParts(this.activedRoute.snapshot);
			if (!routeParts.length) {
				return this.title.setTitle(this.appTitle);
			}
			// Extract title from parts;
			this.pageTitle = routeParts
				.reverse()
				.map((part) => part.title)
				.reduce((partA, partI) => `${partA} > ${partI}`);
			this.pageTitle += ` | ${this.appTitle}`;
			this.title.setTitle(this.pageTitle);
		});
	}

}
