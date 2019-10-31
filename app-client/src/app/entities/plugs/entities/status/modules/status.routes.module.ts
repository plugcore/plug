import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugsStatusComponent } from '../components/status.component';

const routes: Routes = [
	{
		path: '',
		component: PlugsStatusComponent
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
