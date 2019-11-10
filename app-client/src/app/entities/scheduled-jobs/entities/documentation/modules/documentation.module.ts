import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { ScheduledJobsDocumentationComponent } from '../components/documentation.component';
import { ScheduledJobsDocumentationInfoComponent } from '../components/info/info.component';
import { ScheduledJobsDocumentationRoutesModule } from './documentation.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ScheduledJobsDocumentationRoutesModule,
		MatCardModule,
		MatButtonModule,
		PlugJsonNavigationModule
	],
	declarations: [
		ScheduledJobsDocumentationComponent,
		ScheduledJobsDocumentationInfoComponent
	]
})
export class ScheduledJobsDocumentationModule {}
