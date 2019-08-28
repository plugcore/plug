import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'documentation',
		loadChildren: '../../plugs/entities/documentation/modules/documentation.module#PlugsDocumentationModule',
		data: {
			title: 'Documentation',
			breadcrumb: 'Documentation'
		}
	},
	{
		path: 'status',
		loadChildren: '../../plugs/entities/status/modules/status.module#PlugsStatusModule',
		data: {
			title: 'Status',
			breadcrumb: 'Status'
		}
	},
	{
		path: 'log',
		loadChildren: '../../plugs/entities/log/modules/log.module#PlugsLogModule',
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
export class PlugsRoutesModule { }
