import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugsDocumentationRoutesModule } from './documentation.routes.module';
import { PlugsDocumentationComponent } from '../components/documentation.component';
import { PlugsDocumentationInfoComponent } from '../components/info/info.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		PlugsDocumentationRoutesModule,
		MatCardModule,
		MatButtonModule
	],
	declarations: [
		PlugsDocumentationComponent,
		PlugsDocumentationInfoComponent
	]
})
export class PlugsDocumentationModule {}
