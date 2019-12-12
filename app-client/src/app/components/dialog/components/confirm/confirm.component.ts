import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'plug-dialog-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class PlugDialogConfirmComponent implements OnInit {

	@Output() public eventEemiter = new EventEmitter<any>();

	public data: any;

	constructor() { }

	ngOnInit() {
	}

}
