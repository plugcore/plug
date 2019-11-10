import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ApiApiTokenUpdateComponent } from '../components/update.component';
import { ApiApiTokenUpdateRoutesModule } from './update.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ApiApiTokenUpdateRoutesModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatCardModule,
		MatSelectModule,
		MatRadioModule
	],
	declarations: [
		ApiApiTokenUpdateComponent
	]
})
export class ApiApiTokenUpdateModule {}
