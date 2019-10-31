import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'plug-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class PlugDialogComponent implements OnInit {

	@ViewChild('template', { static: true, read: ViewContainerRef }) template: ViewContainerRef;

	constructor(@Inject(MAT_DIALOG_DATA) public input: any,
		private resolver: ComponentFactoryResolver,
		public dialogRef: MatDialogRef<PlugDialogComponent>) { }

	ngOnInit() {
		this.createComponent();
	}

	public createComponent(): void {
		this.template.clear();
		const factory = this.resolver.resolveComponentFactory(this.input['component']);
		const componentRef = this.template.createComponent(factory);
		componentRef.instance['data'] = this.input['extraData'];
		componentRef.instance['eventEmmiter'].subscribe((output) => {
			this.closeDialog(output);
		});
	}

	public closeDialog(output: any): void {
		this.dialogRef.close(output);
	}

}
