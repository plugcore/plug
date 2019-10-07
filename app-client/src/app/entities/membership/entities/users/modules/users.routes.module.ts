import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipUsersComponent } from '../components/users.component';


const routes: Routes = [
	{
		path: '',
		component: MembershipUsersComponent
	},
	{
		path: 'update',
		loadChildren: '../../../../membership/entities/users/entities/update/modules/update.module#MembershipUsersUpdateModule',
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
export class MembershipUsersRoutesModule { }
