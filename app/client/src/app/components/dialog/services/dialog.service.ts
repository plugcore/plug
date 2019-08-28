import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PlugDialogComponent } from '../components/dialog.component';
import { PlugDialogConfirmComponent } from '../components/confirm/confirm.component';

@Injectable()
export class PlugDialogService {

	constructor(private dialog: MatDialog) { }

	public openModal<T>(
		component: Function, title?: string, extraData?: any, cssClass?: string, width?: number, disableClose?: boolean, enterKeydown?: boolean
	): Observable<T> {
		const dialogRef = this.dialog.open(PlugDialogComponent, {
			width: width + 'px',
			panelClass: cssClass,
			data: {
				title: title,
				enterKeydown: enterKeydown,
				component: component,
				extraData: extraData
			},
			disableClose: disableClose,
			autoFocus: false
		});
		if (enterKeydown) {
			dialogRef.keydownEvents().subscribe((event: KeyboardEvent) => {
				if (event.key === 'Enter') {
					dialogRef.close();
				}
			});
		}
		return dialogRef.afterClosed();
	}

	public confirmModal(text: string): Observable<boolean> {
		return this.openModal(PlugDialogConfirmComponent, 'Are you sure to perform this action?', text,
			'confirm-dialog', undefined, false, true);
	}
}
