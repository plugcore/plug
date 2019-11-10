import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { PlugsLogDetailsComponent } from '../components/details/details.component';
import { PlugsLogComponent } from '../components/log.component';
import { PlugsLogRoutesModule } from './log.routes.module';

@NgModule({
	imports: [
		CommonModule,
		PlugTableModule,
		PlugsLogRoutesModule,
		MatSelectModule,
		PlugJsonNavigationModule
	],
	declarations: [
		PlugsLogComponent,
		PlugsLogDetailsComponent
	],
	entryComponents: [
		PlugsLogDetailsComponent
	]
})
export class PlugsLogModule {}
