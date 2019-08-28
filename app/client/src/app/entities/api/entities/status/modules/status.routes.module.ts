import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiStatusComponent } from '../components/status.component';

const routes: Routes = [
	{
		path: '',
		component: ApiStatusComponent
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
export class ApiStatusRoutesModule { }
