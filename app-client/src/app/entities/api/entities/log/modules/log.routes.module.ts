import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiLogComponent } from '../components/log.component';

const routes: Routes = [
	{
		path: '',
		component: ApiLogComponent
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
export class ApiLogRoutesModule { }
