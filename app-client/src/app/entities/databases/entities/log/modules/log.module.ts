import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { DatabasesLogDetailsComponent } from '../components/details/details.component';
import { DatabasesLogComponent } from '../components/log.component';
import { DatabasesLogRoutesModule } from './log.routes.module';

@NgModule({
	imports: [
		CommonModule,
		DatabasesLogRoutesModule,
		PlugTableModule,
		MatSelectModule,
		PlugJsonNavigationModule
	],
	declarations: [
		DatabasesLogComponent,
		DatabasesLogDetailsComponent
	],
	entryComponents: [
		DatabasesLogDetailsComponent
	]
})
export class DatabasesLogModule {}
