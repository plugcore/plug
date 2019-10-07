import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PlugDialogComponent } from '../components/dialog.component';
import { PlugDialogConfirmComponent } from '../components/confirm/confirm.component';
import { PlugDialogService } from '../services/dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		MatDialogModule,
		FlexLayoutModule
	],
	declarations: [
		PlugDialogComponent,
		PlugDialogConfirmComponent
	],
	entryComponents: [
		PlugDialogComponent,
		PlugDialogConfirmComponent
	],
	providers: [
		PlugDialogService
	]
})
export class PlugDialogModule { }
