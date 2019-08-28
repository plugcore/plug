import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatabasesRoutesModule } from './databases.routes.module';

@NgModule({
	imports: [
		CommonModule,
		DatabasesRoutesModule,
	]
})
export class DatabasesModule {}
