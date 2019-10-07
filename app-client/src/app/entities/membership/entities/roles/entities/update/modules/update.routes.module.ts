import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipRolesUpdateComponent } from '../components/update.component';

const routes: Routes = [
	{
		path: '',
		component: MembershipRolesUpdateComponent
	},
	{
		path: ':id',
		component: MembershipRolesUpdateComponent
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
export class MembershipRolesUpdateRoutesModule { }
