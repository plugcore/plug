import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'documentation'
	},
	{
		path: 'documentation',
		loadChildren: '../../databases/entities/documentation/modules/documentation.module#DatabasesDocumentationModule',
		data: {
			title: 'Documentation',
			breadcrumb: 'Documentation'
		}
	},
	{
		path: 'log',
		loadChildren: '../../databases/entities/log/modules/log.module#DatabasesLogModule',
		data: {
			title: 'Log',
			breadcrumb: 'Log'
		}
	},
	{
		path: 'status',
		loadChildren: '../../databases/entities/status/modules/status.module#DatabasesStatusModule',
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
export class DatabasesRoutesModule { }
