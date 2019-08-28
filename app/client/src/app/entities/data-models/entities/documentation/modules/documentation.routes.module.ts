import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModelsDocumentationComponent } from '../components/documentation.component';
import { DataModelsDocumentationInfoComponent } from '../components/info/info.component';

const routes: Routes = [
	{
		path: '',
		component: DataModelsDocumentationComponent
	},
	{
		path: ':id',
		component: DataModelsDocumentationInfoComponent,
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
export class DataModelsDocumentationRoutesModule { }
