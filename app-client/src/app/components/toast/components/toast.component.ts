import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
	selector: 'plug-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss']
})
export class PlugToastComponent implements OnInit {

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
		private snackBarRef: MatSnackBarRef<PlugToastComponent>) { }

	ngOnInit() {
	}

	public closeSnackBar() {
		this.snackBarRef.dismiss();
	}

}
