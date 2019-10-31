import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatCardModule, MatCheckboxModule,
	MatDatepickerModule, MatDialogModule, MatDividerModule, MatIconModule,
	MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSortModule,
	MatTableModule, MatTooltipModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PlugDialogModule } from '../../dialog/modules/dialog.module';
import { TableFilterDateComponent } from '../components/table-filter-date/table-filter-date.component';
import { TableFilterComponent } from '../components/table-filter/table-filter.component';
import { ExpansionFilterPipe, ShowColumnDirective, TableComponent } from '../components/table.component';

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatDatepickerModule,
		MatDividerModule,
		MatCardModule,
		MatTooltipModule,
		CdkTableModule,
		MatListModule,
		MatCheckboxModule,
		FormsModule,
		MatMomentDateModule,
		PlugDialogModule
	],
	providers: [
		ShowColumnDirective,
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
		{ provide: LOCALE_ID, useValue: 'es-ES' },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
	],
	declarations: [
		TableComponent,
		TableFilterComponent,
		TableFilterDateComponent,
		ShowColumnDirective,
		ExpansionFilterPipe
	],
	exports: [
		TableComponent
	],
	entryComponents: [
		TableFilterComponent
	]
})
export class PlugTableModule { }
