import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ScheduledJobsStatusDetailsComponent } from '../components/details/details.component';
import { ScheduledJobsStatusComponent } from '../components/status.component';
import { ScheduledJobsStatusRoutesModule } from './status.routes.module';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsStatusRoutesModule,
		PlugTableModule,
		MatSelectModule,
		PlugJsonNavigationModule
	],
	declarations: [
		ScheduledJobsStatusComponent,
		ScheduledJobsStatusDetailsComponent
	],
	entryComponents: [
		ScheduledJobsStatusDetailsComponent
	]
})
export class ScheduledJobsStatusModule {}
