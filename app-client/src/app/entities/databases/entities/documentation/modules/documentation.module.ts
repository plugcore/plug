import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { DatabasesDocumentationComponent } from '../components/documentation.component';
import { DatabasesDocumentationRoutesModule } from './documentation.routes.module';

@NgModule({
	imports: [
		CommonModule,
		DatabasesDocumentationRoutesModule,
		MatCardModule,
		PlugJsonNavigationModule,
		MatButtonModule
	],
	declarations: [
		DatabasesDocumentationComponent
	]
})
export class DatabasesDocumentationModule {}
