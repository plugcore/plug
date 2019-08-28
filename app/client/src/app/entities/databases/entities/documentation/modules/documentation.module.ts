import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatabasesDocumentationComponent } from '../components/documentation.component';
import { DatabasesDocumentationRoutesModule } from './documentation.routes.module';
import { MatCardModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		DatabasesDocumentationRoutesModule,
		MatCardModule
	],
	declarations: [
		DatabasesDocumentationComponent
	]
})
export class DatabasesDocumentationModule {}
