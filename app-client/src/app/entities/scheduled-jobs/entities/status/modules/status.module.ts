import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ScheduledJobsStatusDetailsComponent } from '../components/details/details.component';
import { ScheduledJobsStatusComponent } from '../components/status.component';
import { ScheduledJobsStatusRoutesModule } from './status.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsStatusRoutesModule,
		PlugTableModule
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
