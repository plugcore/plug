import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMenuService } from '../../../components/layout/services/menu/menu.internal.service';
import { DashboardComponent } from '../components/dashboard.component';
import { DashboardRoutesModule } from './dashboard.routes.module';


@NgModule({
	imports: [
		CommonModule,
		DashboardRoutesModule
	],
	declarations: [
		DashboardComponent
	],
	providers: [
		LayoutMenuService
	]
})
export class DashboardModule {}
