import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledJobsDocumentationComponent } from '../components/documentation.component';
import { ScheduledJobsDocumentationInfoComponent } from '../components/info/info.component';

const routes: Routes = [
	{
		path: '',
		component: ScheduledJobsDocumentationComponent
	},
	{
		path: ':id',
		component: ScheduledJobsDocumentationInfoComponent,
		data: {
			title: 'Info',
			breadcrumb: 'Info'
		}
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ScheduledJobsDocumentationRoutesModule { }
