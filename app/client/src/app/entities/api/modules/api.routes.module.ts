import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'documentation',
		loadChildren: '../../api/entities/documentation/modules/documentation.module#ApiDocumentationModule',
		data: {
			title: 'Documentation',
			breadcrumb: 'Documentation'
		}
	},
	{
		path: 'status',
		loadChildren: '../../api/entities/status/modules/status.module#ApiStatusModule',
		data: {
			title: 'Status',
			breadcrumb: 'Status'
		}
	},
	{
		path: 'log',
		loadChildren: '../../api/entities/log/modules/log.module#ApiLogModule',
		data: {
			title: 'Log',
			breadcrumb: 'Log'
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
export class ApiRoutesModule { }
