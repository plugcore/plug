import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PlugToastComponent } from '../components/toast.component';
import { PlugToastService } from '../services/toast.service';

@NgModule({
	imports: [
		CommonModule,
		MatSnackBarModule
	],
	declarations: [
		PlugToastComponent
	],
	entryComponents: [
		PlugToastComponent
	],
	providers: [
		PlugToastService
	]
})
export class PlugToastModule { }
