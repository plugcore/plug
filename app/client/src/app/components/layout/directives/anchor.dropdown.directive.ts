import { Directive, HostListener, Inject } from '@angular/core';
import { DropdownLinkDirective } from './link.dropdown.directive';

@Directive({
	selector: '[plugDropdownToggle]'
})
export class DropdownAnchorDirective {

	protected navlink: DropdownLinkDirective;

	constructor(@Inject(DropdownLinkDirective) navlink: DropdownLinkDirective) {
		this.navlink = navlink;
	}

	@HostListener('click', ['$event'])
	onClick(e: any) {
		this.navlink.toggle();
	}
}
