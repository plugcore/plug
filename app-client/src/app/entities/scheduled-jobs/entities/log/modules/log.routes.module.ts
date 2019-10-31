import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledJobsLogComponent } from '../components/log.component';

const routes: Routes = [
	{
		path: '',
		component: ScheduledJobsLogComponent
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
export class ScheduledJobsLogRoutesModule { }
