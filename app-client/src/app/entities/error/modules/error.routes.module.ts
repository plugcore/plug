import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from '../components/404/404.component';
import { Error500Component } from '../components/500/500.component';
import { Error403Component } from '../components/403/403.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '404'
	},
	{
		path: '403',
		component: Error403Component,
		data: {
			title: '403',
			breadcrumb: '403'
		}
	},
	{
		path: '404',
		component: Error404Component,
		data: {
			title: '404',
			breadcrumb: '404'
		}
	},
	{
		path: '500',
		component: Error500Component,
		data: {
			title: '500',
			breadcrumb: '500'
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
export class ErrorRoutesModule { }
