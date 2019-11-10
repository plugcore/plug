import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutBreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { LayoutComponent } from '../components/layout.component';
import { LayoutMainContentComponent } from '../components/main-content/main-content.component';
import { SidebarDesktopComponent } from '../components/sidebar/desktop/desktop.component';
import { SidebarMobileComponent } from '../components/sidebar/mobile/mobile.component';
import { SidebarNavComponent } from '../components/sidebar/nav/nav.component';
import { TopbarSidenavComponent } from '../components/topbar/sidenav/sidenav.component';
import { TopbarTopnavComponent } from '../components/topbar/topnav/topnav.component';
import { DropdownAnchorDirective } from '../directives/anchor.dropdown.directive';
import { DropdownDirective } from '../directives/dropdown.directive';
import { DropdownLinkDirective } from '../directives/link.dropdown.directive';
import { LayoutMenuService } from '../services/menu/menu.internal.service';
import { LayoutRouterService } from '../services/router/router.internal.service';


// Importing Pipes for Spanish
registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserAnimationsModule,
		RouterModule,
		FlexLayoutModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatSelectModule,
		MatMenuModule,
		MatDividerModule,
		MatTooltipModule,
		MatSidenavModule,
		MatListModule,
		MatGridListModule,
		MatExpansionModule,
		MatCardModule,
		MatInputModule,
		ReactiveFormsModule
	],
	providers: [
		LayoutRouterService,
		LayoutMenuService
	],
	declarations: [
		LayoutComponent,
		LayoutMainContentComponent,
		LayoutBreadcrumbComponent,
		TopbarTopnavComponent,
		TopbarSidenavComponent,
		DropdownAnchorDirective,
		DropdownLinkDirective,
		DropdownDirective,
		SidebarDesktopComponent,
		SidebarMobileComponent,
		SidebarNavComponent
	],
	exports: [
		LayoutComponent
	]
})
export class PlugLayoutModule { }
