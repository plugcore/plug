import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDesignerUpdateComponent } from '../components/update.component';

const routes: Routes = [
	{
		path: '',
		component: ApiDesignerUpdateComponent
	},
	{
		path: ':id',
		component: ApiDesignerUpdateComponent
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
export class ApiDesignerUpdateRoutesModule { }
