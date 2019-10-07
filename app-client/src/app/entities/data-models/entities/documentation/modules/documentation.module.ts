import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataModelsDocumentationComponent } from '../components/documentation.component';
import { DataModelsDocumentationRoutesModule } from './documentation.routes.module';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { DataModelsDocumentationInfoComponent } from '../components/info/info.component';

@NgModule({
	imports: [
		CommonModule,
		DataModelsDocumentationRoutesModule,
		MatCardModule,
		MatButtonModule
	],
	declarations: [
		DataModelsDocumentationComponent,
		DataModelsDocumentationInfoComponent
	]
})
export class DataModelsDocumentationModule {}
