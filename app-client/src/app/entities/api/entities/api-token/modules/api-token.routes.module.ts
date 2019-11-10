import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiApiTokenComponent } from '../components/api-token.component';


const routes: Routes = [
	{
		path: '',
		component: ApiApiTokenComponent
	},
	{
		path: 'update',
		loadChildren: () => import('../entities/update/modules/update.module').then(m => m.ApiApiTokenUpdateModule),
		data: {
			title: 'Update',
			breadcrumb: 'Update'
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
export class ApiApiTokenRoutesModule { }
