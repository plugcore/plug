import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabasesLogComponent } from '../components/log.component';

const routes: Routes = [
	{
		path: '',
		component: DatabasesLogComponent
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
export class DatabasesLogRoutesModule { }
