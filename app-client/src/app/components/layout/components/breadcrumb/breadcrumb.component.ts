import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, PRIMARY_OUTLET, Router } from '@angular/router';

import { LayoutRouterService } from '../../services/router/router.internal.service';

interface Route {
	label: string;
	title: string;
	params?: Params;
	url: string;
}

@Component({
	selector: 'plug-layout-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss']
})
export class LayoutBreadcrumbComponent implements OnInit {

	useBreadcrumb = true;
	breadcrumbTitle = '';
	breadcrumb: Route[];

	constructor(
		private routerService: LayoutRouterService
	) {

	}

	ngOnInit() {
		const that = this;
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.useBreadcrumb = routeConf.useBreadcrumb;
		});

		this.routerService.activatedRooteRootObs.subscribe((activatedRouteRoot) => {
			that.breadcrumb = [];
			// <!-- Comment|Uncomment if you want to hide|show route '/' in the breadcrumb
			/* const home: Route = {
				label: 'HOME',
				title: 'HOME',
				url: '/'
			};
			that.breadcrumb.push(home); */
			// -->
			that.breadcrumb = that.breadcrumb.concat(this.getBreadcrumbs(activatedRouteRoot));
			that.breadcrumbTitle = that.breadcrumb[that.breadcrumb.length - 1].title;
		});
	}

	private getBreadcrumbs(
		route: ActivatedRoute,
		url: string = '',
		breadcrumb: Route[] = []
	): Route[] {
		const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
		const ROUTE_DATA_TITLE = 'title';
		const children: ActivatedRoute[] = route.children;
		const routeArray = [];
		let label = '';

		if (children.length === 0) {
			return breadcrumb;
		}

		for (const child of children) {
			if (child.outlet !== PRIMARY_OUTLET) {
				continue;
			}

			if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
				return this.getBreadcrumbs(child, url, breadcrumb);
			}

			if (child.snapshot.url.map(segment => segment.path).length === 0) {
				return this.getBreadcrumbs(child, url, breadcrumb);
			}

			child.snapshot.url.map(segment => segment.path).forEach(el => routeArray.push(el));

			for (let i = 0; i < routeArray.length; i++) {
				if (Object.keys(child.snapshot.params).length > 0) {
					if (this.isParam(child.snapshot.params, routeArray[i])) {
						label = routeArray[i];
					} else {
						label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
					}
				} else {
					label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
				}
				const title = child.snapshot.data[ROUTE_DATA_TITLE];
				const routeURL = routeArray[i];
				url += `/${routeURL}`;
				const newRoute: Route = {
					label: label,
					title: title,
					params: child.snapshot.params,
					url: url
				};
				breadcrumb.push(newRoute);
			}

			return this.getBreadcrumbs(child, url, breadcrumb);

		}

		return breadcrumb;

	}

	private isParam(params: Params, segment: string) {
		for (const key of Object.keys(params)) {
			const value = params[key];
			if (value === segment) {
				return true;
			}
		}
		return false;
	}

}
