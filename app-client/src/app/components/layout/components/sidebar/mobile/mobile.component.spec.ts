import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMobileComponent } from './mobile.component';

describe('SidebarMobileComponent', () => {
	let component: SidebarMobileComponent;
	let fixture: ComponentFixture<SidebarMobileComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidebarMobileComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarMobileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
