import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule,
	MatIconModule, MatInputModule, MatSelectModule
} from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../../../components/json-navigation/modules/json-navigation.module';
import { ApiDesignerUpdateComponent } from '../components/update.component';
import { ApiDesignerUpdateRoutesModule } from './update.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ApiDesignerUpdateRoutesModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatCardModule,
		PlugJsonNavigationModule,
		MatChipsModule,
		MatIconModule,
		MatSelectModule
	],
	declarations: [
		ApiDesignerUpdateComponent
	]
})
export class ApiDesignerUpdateModule {}
