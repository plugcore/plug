import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ScheduledJobsLogDetailsComponent } from '../components/details/details.component';
import { ScheduledJobsLogComponent } from '../components/log.component';
import { ScheduledJobsLogRoutesModule } from './log.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsLogRoutesModule,
		PlugTableModule,
		MatSelectModule,
		PlugJsonNavigationModule
	],
	declarations: [
		ScheduledJobsLogComponent,
		ScheduledJobsLogDetailsComponent
	],
	entryComponents: [
		ScheduledJobsLogDetailsComponent
	]
})
export class ScheduledJobsLogModule {}
