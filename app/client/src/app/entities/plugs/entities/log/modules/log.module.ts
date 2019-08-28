import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugsLogComponent } from '../components/log.component';
import { PlugsLogRoutesModule } from './log.routes.module';
import { PlugsLogDetailsComponent } from '../components/details/details.component';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';

@NgModule({
	imports: [
		CommonModule,
		PlugTableModule,
		PlugsLogRoutesModule
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
