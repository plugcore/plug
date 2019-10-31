import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipRolesComponent } from '../components/roles.component';


const routes: Routes = [
	{
		path: '',
		component: MembershipRolesComponent
	},
	{
		path: 'update',
		loadChildren: '../../../../membership/entities/roles/entities/update/modules/update.module#MembershipRolesUpdateModule',
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
export class MembershipRolesRoutesModule { }
