import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ApiApiTokenComponent } from '../components/api-token.component';
import { ApiApiTokenRoutesModule } from './api-token.routes.module';


@NgModule({
	imports: [
		CommonModule,
		ApiApiTokenRoutesModule,
		PlugTableModule
	],
	declarations: [
		ApiApiTokenComponent
	]
})
export class ApiApiTokenModule {}
