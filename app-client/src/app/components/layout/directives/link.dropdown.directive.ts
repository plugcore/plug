import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
	selector: '[plugDropdownLink]'
})
export class DropdownLinkDirective implements OnInit, OnDestroy {

	@Input() public group: any;

	@HostBinding('class.open')
	@Input()
	get open(): boolean {
		return this._open;
	}

	set open(value: boolean) {
		this._open = value;
		if (value) {
			this.nav.closeOtherLinks(this);
		}
	}

	protected _open: boolean;
	protected nav: DropdownDirective;

	public constructor(@Inject(DropdownDirective) nav: DropdownDirective) {
		this.nav = nav;
	}

	public ngOnInit(): any {
		this.nav.addLink(this);
	}

	public ngOnDestroy(): any {
		this.nav.removeGroup(this);
	}

	public toggle(): any {
		this.open = !this.open;
	}

}
