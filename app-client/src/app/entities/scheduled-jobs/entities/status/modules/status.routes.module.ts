import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledJobsStatusComponent } from '../components/status.component';

const routes: Routes = [
	{
		path: '',
		component: ScheduledJobsStatusComponent
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
export class ScheduledJobsStatusRoutesModule { }
