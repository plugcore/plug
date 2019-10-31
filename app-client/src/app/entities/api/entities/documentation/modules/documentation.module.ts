import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiDocumentationComponent } from '../components/documentation.component';
import { ApiDocumentationRoutesModule } from './documentation.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ApiDocumentationRoutesModule
	],
	declarations: [
		ApiDocumentationComponent
	]
})
export class ApiDocumentationModule {}
