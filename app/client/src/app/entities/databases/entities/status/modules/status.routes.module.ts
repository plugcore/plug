import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabasesStatusComponent } from '../components/status.component';

const routes: Routes = [
	{
		path: '',
		component: DatabasesStatusComponent
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
export class DatabasesStatusRoutesModule { }
