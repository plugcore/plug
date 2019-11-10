import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule,
	MatSelectModule, MatTableModule, MatRadioModule, MatDatepickerModule,
	MatTabsModule, MatButtonModule, MatInputModule
} from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';
import { PlugsStatusFilterCheckboxComponent } from '../components/info/filter-checkbox/filter-checkbox.component';
import { PlugsStatusFilterComponent } from '../components/info/filter/filter.component';
import { PlugsStatusInfoComponent } from '../components/info/info.component';
import { PlugsStatusComponent } from '../components/status.component';
import { PlugsStatusRoutesModule } from './status.routes.module';
import { PlugTableModule } from '../../../../../components/table/modules/table.module';

@NgModule({
	imports: [
		CommonModule,
		PlugsStatusRoutesModule,
		MatCardModule,
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule,
		GoogleChartsModule,
		MatCheckboxModule,
		MatTableModule,
		ReactiveFormsModule,
		MatRadioModule,
		MatDatepickerModule,
		PlugTableModule,
		MatTabsModule,
		MatButtonModule,
		MatInputModule
	],
	declarations: [
		PlugsStatusComponent,
		PlugsStatusInfoComponent,
		PlugsStatusFilterCheckboxComponent,
		PlugsStatusFilterComponent
	],
	entryComponents: [
		PlugsStatusFilterCheckboxComponent,
		PlugsStatusFilterComponent
	]
})
export class PlugsStatusModule {}
