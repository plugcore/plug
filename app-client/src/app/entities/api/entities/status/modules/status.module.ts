import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatInputModule,
	MatRadioModule, MatSelectModule, MatTableModule, MatTabsModule
} from '@angular/material';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';
import { ApiStatusFilterCheckboxComponent } from '../components/filter-checkbox/filter-checkbox.component';
import { ApiStatusFilterComponent } from '../components/filter/filter.component';
import { ApiStatusComponent } from '../components/status.component';
import { ApiStatusRoutesModule } from './status.routes.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
	imports: [
		CommonModule,
		ApiStatusRoutesModule,
		PlugTableModule,
		MatSelectModule,
		MatButtonModule,
		MatDatepickerModule,
		MatRadioModule,
		MatInputModule,
		ReactiveFormsModule,
		MatTabsModule,
		MatCheckboxModule,
		MatTableModule,
		GoogleChartsModule
	],
	declarations: [
		ApiStatusComponent,
		ApiStatusFilterComponent,
		ApiStatusFilterCheckboxComponent
	],
	entryComponents: [
		ApiStatusFilterComponent,
		ApiStatusFilterCheckboxComponent
	]
})
export class ApiStatusModule {}
