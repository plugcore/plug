import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiApiTokenUpdateComponent } from '../components/update.component';

const routes: Routes = [
	{
		path: '',
		component: ApiApiTokenUpdateComponent
	},
	{
		path: ':id',
		component: ApiApiTokenUpdateComponent
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
export class ApiApiTokenUpdateRoutesModule { }
