import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { SystemConfigurationComponent } from '../components/configuration.component';
import { SystemConfigurationRoutesModule } from './configuration.routes.module';
import { PlugJsonNavigationModule } from '../../../../../components/json-navigation/modules/json-navigation.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SystemConfigurationRoutesModule,
		MatCardModule,
		PlugJsonNavigationModule
	],
	declarations: [
		SystemConfigurationComponent
	]
})
export class SystemConfigurationModule { }
