import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlugsDocumentationComponent } from '../components/documentation.component';
import { PlugsDocumentationInfoComponent } from '../components/info/info.component';

const routes: Routes = [
	{
		path: '',
		component: PlugsDocumentationComponent
	},
	{
		path: ':id',
		component: PlugsDocumentationInfoComponent,
		data: {
			title: 'Info',
			breadcrumb: 'Info'
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
export class PlugsDocumentationRoutesModule { }
