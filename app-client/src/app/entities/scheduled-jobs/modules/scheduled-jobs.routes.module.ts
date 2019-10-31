import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'documentation',
		loadChildren: '../../scheduled-jobs/entities/documentation/modules/documentation.module#ScheduledJobsDocumentationModule',
		data: {
			title: 'Documentation',
			breadcrumb: 'Documentation'
		}
	},
	{
		path: 'log',
		loadChildren: '../../scheduled-jobs/entities/log/modules/log.module#ScheduledJobsLogModule',
		data: {
			title: 'Log',
			breadcrumb: 'Log'
		}
	},
	{
		path: 'status',
		loadChildren: '../../scheduled-jobs/entities/status/modules/status.module#ScheduledJobsStatusModule',
		data: {
			title: 'Status',
			breadcrumb: 'Status'
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
export class ScheduledJobsRoutesModule { }
