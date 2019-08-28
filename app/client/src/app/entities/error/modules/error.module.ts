import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Error404Component } from '../components/404/404.component';
import { Error500Component } from '../components/500/500.component';
import { ErrorRoutesModule } from './error.routes.module';

@NgModule({
	imports: [
		CommonModule,
		ErrorRoutesModule,
		MatIconModule,
		MatButtonModule,
	],
	declarations: [
		Error404Component,
		Error500Component
	]
})
export class ErrorModule {}
