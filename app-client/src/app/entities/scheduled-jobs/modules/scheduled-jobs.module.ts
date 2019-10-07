import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduledJobsRoutesModule } from './scheduled-jobs.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsRoutesModule,
	]
})
export class ScheduledJobsModule {}
