import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ApiDesignerComponent } from '../components/designer.component';
import { ApiDesignerRoutesModule } from './designer.routes.module';


@NgModule({
	imports: [
		CommonModule,
		ApiDesignerRoutesModule,
		PlugTableModule
	],
	declarations: [
		ApiDesignerComponent
	]
})
export class ApiDesignerModule {}
