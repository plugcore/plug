import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users'
	},
	{
		path: 'users',
		loadChildren: '../../membership/entities/users/modules/users.module#MembershipUsersModule',
		data: {
			title: 'Users',
			breadcrumb: 'Users'
		}
	},
	{
		path: 'roles',
		loadChildren: '../../membership/entities/roles/modules/roles.module#MembershipRolesModule',
		data: {
			title: 'Roles',
			breadcrumb: 'Roles'
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
export class MembershipRoutesModule { }
