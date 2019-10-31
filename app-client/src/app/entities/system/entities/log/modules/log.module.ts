import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { SystemLogRoutesModule } from './log.routes.module';
import { SystemLogComponent } from '../components/log.component';
import { SystemLogDetailsComponent } from '../components/details/details.component';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';


@NgModule({
	imports: [
		CommonModule,
		SystemLogRoutesModule,
		PlugTableModule,
		PlugJsonNavigationModule
	],
	declarations: [
		SystemLogComponent,
		SystemLogDetailsComponent
	],
	entryComponents: [
		SystemLogDetailsComponent
	]
})
export class SystemLogModule {}
