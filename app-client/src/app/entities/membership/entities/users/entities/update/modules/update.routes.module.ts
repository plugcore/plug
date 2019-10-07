import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipUsersUpdateComponent } from '../components/update.component';

const routes: Routes = [
	{
		path: '',
		component: MembershipUsersUpdateComponent
	},
	{
		path: ':id',
		component: MembershipUsersUpdateComponent
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
export class MembershipUsersUpdateRoutesModule { }
