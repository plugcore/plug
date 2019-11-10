import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatProgressBarModule,
} from '@angular/material';
import { SessionRoutesModule } from './session.routes.module';
import { SessionSigninComponent } from '../components/signin/signin.component';

@NgModule({
	imports: [
		CommonModule,
		SessionRoutesModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatProgressBarModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatCheckboxModule,
		MatIconModule
	],
	declarations: [
		SessionSigninComponent
	]
})
export class SessionModule { }
