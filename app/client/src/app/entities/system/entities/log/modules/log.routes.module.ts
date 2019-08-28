import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemLogComponent } from '../components/log.component';

const routes: Routes = [
	{
		path: '',
		component: SystemLogComponent,
		data: {
			title: 'Log',
			breadcrumb: 'Log'
		}
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
export class SystemLogRoutesModule { }
