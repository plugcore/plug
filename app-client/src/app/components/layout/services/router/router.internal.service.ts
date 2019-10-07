import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface IRouteConf {
	useBreadcrumb?: boolean;
	topbarFixed?: boolean;
	isMobile?: boolean;
	layoutInTransition?: boolean;
	useNotifications: boolean;
	useLogin: boolean;
	useTranslate: boolean;
	useTopBar: boolean;
	navigationPos?: string;   // side, top
	sidebarStyle?: string;    // full, compact, closed
}

interface IRouteChangeOptions {
	duration?: number;
	transitionClass?: boolean;
}

interface IRoutePart {
	title: string;
	breadcrumb: string;
	params?: Params;
	url: string;
	urlSegments: any[];
}

const defaultRouteConf = {
	'useBreadcrumb': true,
	'topbarFixed': false,
	'isMobile': false,
	'useNotifications': true,
	'useLogin': true,
	'useTranslate': true,
	'navigationPos': 'side',
	'sidebarStyle': 'full',
	'useTopBar': true
};

@Injectable()
export class LayoutRouterService {

	public routeParts: IRoutePart[];

	private routeConf: IRouteConf;

	private _activatedRooteRootRS: Subject<ActivatedRoute> = new ReplaySubject<ActivatedRoute>(1);
	public readonly activatedRooteRootObs: Observable<ActivatedRoute> = this._activatedRooteRootRS.asObservable();

	private _routeConfRS: Subject<IRouteConf> = new ReplaySubject<IRouteConf>(1);
	public readonly routeConfObs: Observable<IRouteConf> = this._routeConfRS.asObservable();

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		this.routeConf = defaultRouteConf;

		// this.activatedRoute.data.subscribe(params => console.log('PARAMS: ', params));

		this.router.events.pipe(
				filter(event => event instanceof RoutesRecognized),
				map((event: RoutesRecognized) => {
					return this.lastChild(event.state.root).data['routeConf'];
				})
			).subscribe(newRouteConf => {
				if (this.isSm()) {
					defaultRouteConf.isMobile = true;
					defaultRouteConf.sidebarStyle = 'closed';
				} else {
					defaultRouteConf.isMobile = false;
					defaultRouteConf.sidebarStyle = 'full';
				}
				const newConf = { ...defaultRouteConf, ...newRouteConf };
				this._routeConfRS.next(newConf);
			});

		this.router.events.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				const activatedRouteRoot: ActivatedRoute = this.activatedRoute.root;
				this._activatedRooteRootRS.next(activatedRouteRoot);
			});
	}

	isSm() {
		return window.matchMedia(`(max-width: 959px)`).matches;
	}

	publishLayoutChange(newRouteConf: IRouteConf, opt: IRouteChangeOptions = {}) {
		const duration = opt.duration || 250;
		this.routeConf = defaultRouteConf;
		if (!opt.transitionClass) {
			this.routeConf = { ...this.routeConf, ...newRouteConf };
			this._routeConfRS.next(this.routeConf);
		}

		this.routeConf = { ...this.routeConf, ...newRouteConf, layoutInTransition: true };
		this._routeConfRS.next(this.routeConf);

		setTimeout(() => {
			this.routeConf = { ...this.routeConf, layoutInTransition: false };
			this._routeConfRS.next(this.routeConf);
		}, duration);
	}

	generateRouteParts(snapshot: ActivatedRouteSnapshot): IRoutePart[] {
		let routeParts = <IRoutePart[]>[];
		if (snapshot) {
			if (snapshot.firstChild) {
				routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
			}
			if (snapshot.data['title'] && snapshot.url.length) {
				routeParts.push({
					title: snapshot.data['title'],
					breadcrumb: snapshot.data['breadcrumb'],
					url: snapshot.url[0].path,
					urlSegments: snapshot.url,
					params: snapshot.params
				});
			}
		}
		return routeParts;
	}

	private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
		if (route.firstChild) {
			return this.lastChild(route.firstChild);
		} else {
			return route;
		}
	}
}
