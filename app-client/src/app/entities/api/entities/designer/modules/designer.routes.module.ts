import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiDesignerComponent } from '../components/designer.component';


const routes: Routes = [
	{
		path: '',
		component: ApiDesignerComponent
	},
	{
		path: 'update',
		loadChildren: () => import('../entities/update/modules/update.module').then(m => m.ApiDesignerUpdateModule),
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
export class ApiDesignerRoutesModule { }
