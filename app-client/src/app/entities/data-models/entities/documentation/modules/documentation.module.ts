import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { DataModelsDocumentationComponent } from '../components/documentation.component';
import { DataModelsDocumentationInfoComponent } from '../components/info/info.component';
import { DataModelsDocumentationRoutesModule } from './documentation.routes.module';

@NgModule({
	imports: [
		CommonModule,
		DataModelsDocumentationRoutesModule,
		MatCardModule,
		MatButtonModule,
		PlugJsonNavigationModule
	],
	declarations: [
		DataModelsDocumentationComponent,
		DataModelsDocumentationInfoComponent
	]
})
export class DataModelsDocumentationModule {}
