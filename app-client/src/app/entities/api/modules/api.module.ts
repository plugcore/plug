import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiRoutesModule } from './api.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ApiRoutesModule,
	]
})
export class ApiModule {}
