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
	},
	{
		path: 'designer',
		loadChildren: () => import('../../api/entities/designer/modules/designer.module').then(c => c.ApiDesignerModule),
		data: {
			title: 'Api designer',
			breadcrumb: 'Api designer'
		}
	},
	{
		path: 'api-token',
		loadChildren: () => import('../../api/entities/api-token/modules/api-token.module').then(c => c.ApiApiTokenModule),
		data: {
			title: 'Api token',
			breadcrumb: 'Api token'
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
