import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatabasesStatusRoutesModule } from './status.routes.module';
import { DatabasesStatusComponent } from '../components/status.component';
import { MatCardModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		DatabasesStatusRoutesModule,
		MatCardModule
	],
	declarations: [
		DatabasesStatusComponent
	]
})
export class DatabasesStatusModule {}
