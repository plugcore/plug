import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiStatusRoutesModule } from './status.routes.module';
import { ApiStatusComponent } from '../components/status.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
	imports: [
		CommonModule,
		ApiStatusRoutesModule,
		GoogleChartsModule
	],
	declarations: [
		ApiStatusComponent
	]
})
export class ApiStatusModule {}
