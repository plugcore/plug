import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonNavigationComponent } from '../components/json-navigation.component';
import { MatButtonModule } from '@angular/material';
import { JsonNavigationJsonViewComponent } from '../components/json-view/json-view.component';
import { PlugDialogModule } from '../../dialog/modules/dialog.module';



@NgModule({
	declarations: [
		JsonNavigationComponent,
		JsonNavigationJsonViewComponent
	],
	entryComponents: [
		JsonNavigationJsonViewComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		PlugDialogModule
	],
	exports: [
		JsonNavigationComponent
	]
})
export class PlugJsonNavigationModule { }
