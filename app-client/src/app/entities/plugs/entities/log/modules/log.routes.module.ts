import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugsLogComponent } from '../components/log.component';

const routes: Routes = [
	{
		path: '',
		component: PlugsLogComponent
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
export class PlugsLogRoutesModule { }
