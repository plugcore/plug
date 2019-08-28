import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduledJobsDocumentationRoutesModule } from './documentation.routes.module';
import { ScheduledJobsDocumentationComponent } from '../components/documentation.component';
import { ScheduledJobsDocumentationInfoComponent } from '../components/info/info.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsDocumentationRoutesModule,
		MatCardModule,
		MatButtonModule
	],
	declarations: [
		ScheduledJobsDocumentationComponent,
		ScheduledJobsDocumentationInfoComponent
	]
})
export class ScheduledJobsDocumentationModule {}
