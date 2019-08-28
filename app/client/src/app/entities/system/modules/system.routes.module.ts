import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'configuration'
	},
	{
		path: 'configuration',
		loadChildren: '../../system/entities/configuration/modules/configuration.module#SystemConfigurationModule',
		data: {
			title: 'Configuration',
			breadcrumb: 'Configuration'
		}
	},
	{
		path: 'log',
		loadChildren: '../../system/entities/log/modules/log.module#SystemLogModule',
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
export class SystemRoutesModule { }
