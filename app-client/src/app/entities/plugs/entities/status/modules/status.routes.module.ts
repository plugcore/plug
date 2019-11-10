import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugsStatusComponent } from '../components/status.component';
import { PlugsStatusInfoComponent } from '../components/info/info.component';

const routes: Routes = [
	{
		path: '',
		component: PlugsStatusComponent
	},
	{
		path: ':id',
		component: PlugsStatusInfoComponent
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
export class PlugsStatusRoutesModule { }
