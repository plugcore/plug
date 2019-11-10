import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IRouteConf, LayoutRouterService } from '../services/router/router.internal.service';
import { ContactExternalService } from '../services/contact/contact.external.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'plug-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	public routeConf: IRouteConf = <IRouteConf>{};

	public showPopup = true;
	public showPopupIcon = false;
	public formGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email])
	});
	private alreadySentKey = 'mailAlreadySent';

	constructor(
		private routerService: LayoutRouterService,
		private router: Router,
		private contactExternalService: ContactExternalService,
		private snackBar: MatSnackBar
	) {
		this.routerService.routeConfObs.subscribe((routeConf) => {
			this.routeConf = routeConf;
		});

		const sentAlready = localStorage.getItem(this.alreadySentKey) === 'true';
		if (sentAlready) {
			this.showPopup = false;
			this.showPopupIcon = true;
		}
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

	public closePopup() {
		this.showPopup = false;
		this.showPopupIcon = true;
	}

	public showMailPopup() {
		this.showPopupIcon = false;
		this.showPopup = true;
	}

	public onPopupSubmit() {

		this.contactExternalService.createMessage(this.formGroup.value.email).subscribe(() => {
			this.showPopup = false;
			this.showPopupIcon = true;
			localStorage.setItem(this.alreadySentKey, 'true');
			this.snackBar.open('Email guardado, en poco nos pondremos en contacto con usted.',
				'Cerrar', { duration: 3000, panelClass: ['custom-snackbar'] });
		}, error => {
			this.snackBar.open(
				'Error al enviar mensaje, por favor intente más tarde.',
				'Cerrar',
				{ duration: 3000, panelClass: ['custom-snackbar-error'] }
			);
		});

	}

}
