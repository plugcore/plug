import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { DatabasesStatusComponent } from '../components/status.component';
import { DatabasesStatusRoutesModule } from './status.routes.module';

@NgModule({
	imports: [
		CommonModule,
		DatabasesStatusRoutesModule,
		MatCardModule,
		PlugJsonNavigationModule,
		MatIconModule
	],
	declarations: [
		DatabasesStatusComponent
	]
})
export class DatabasesStatusModule {}
