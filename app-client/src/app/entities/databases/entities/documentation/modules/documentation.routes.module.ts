import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabasesDocumentationComponent } from '../components/documentation.component';

const routes: Routes = [
	{
		path: '',
		component: DatabasesDocumentationComponent
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
export class DatabasesDocumentationRoutesModule { }
