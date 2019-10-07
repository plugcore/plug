import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatabasesLogComponent } from '../components/log.component';
import { DatabasesLogRoutesModule } from './log.routes.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { DatabasesLogDetailsComponent } from '../components/details/details.component';

@NgModule({
	imports: [
		CommonModule,
		DatabasesLogRoutesModule,
		PlugTableModule
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
