import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionSigninComponent } from '../components/signin/signin.component';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'signin'
	},
	{
		path: 'signin',
		component: SessionSigninComponent,
		data: {
			title: 'Signin',
			breadcrumb: 'Signin'
		},
		canActivate: [
			/* AuthGuard */
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	declarations: [
	]
})
export class SessionRoutesModule { }
