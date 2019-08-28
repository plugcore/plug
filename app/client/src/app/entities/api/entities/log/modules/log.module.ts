import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiLogRoutesModule } from './log.routes.module';
import { ApiLogComponent } from '../components/log.component';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ApiLogDetailsComponent } from '../components/details/details.component';

@NgModule({
	imports: [
		CommonModule,
		ApiLogRoutesModule,
		PlugTableModule
	],
	declarations: [
		ApiLogComponent,
		ApiLogDetailsComponent
	],
	entryComponents: [
		ApiLogDetailsComponent
	]
})
export class ApiLogModule {}
