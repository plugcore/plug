import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PlugOverlayComponent } from '../components/overlay.component';
import { PlugOverlayService } from '../services/overlay.service';

@NgModule({
	imports: [
		CommonModule,
		MatProgressSpinnerModule
	],
	declarations: [
		PlugOverlayComponent
	],
	entryComponents: [
		PlugOverlayComponent
	],
	providers: [
		PlugOverlayService
	]
})
export class PlugOverlayModule { }
