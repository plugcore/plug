import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlugToastComponent } from '../components/toast.component';

@Injectable({
	providedIn: 'root'
})
export class PlugToastService {

	constructor(public snackBar: MatSnackBar) { }

	public showToast(duration: number, message: string, panelClass?: string[]): void {
		// setTimeout -> https://github.com/angular/angular/issues/17572
		setTimeout(() => {
			this.snackBar.openFromComponent(PlugToastComponent, {
				duration: duration,
				data: message,
				panelClass: panelClass
			});
		}, 0);
	}
}
