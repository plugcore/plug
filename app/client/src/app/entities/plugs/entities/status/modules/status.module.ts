import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugsStatusRoutesModule } from './status.routes.module';
import { PlugsStatusComponent } from '../components/status.component';
import { MatCardModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		PlugsStatusRoutesModule,
		MatCardModule
	],
	declarations: [
		PlugsStatusComponent
	]
})
export class PlugsStatusModule {}
