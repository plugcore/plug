import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduledJobsLogComponent } from '../components/log.component';
import { ScheduledJobsLogRoutesModule } from './log.routes.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ScheduledJobsLogDetailsComponent } from '../components/details/details.component';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsLogRoutesModule,
		PlugTableModule
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
