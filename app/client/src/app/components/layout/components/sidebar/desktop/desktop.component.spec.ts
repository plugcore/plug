import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDesktopComponent } from './desktop.component';

describe('SidebarDesktopComponent', () => {
	let component: SidebarDesktopComponent;
	let fixture: ComponentFixture<SidebarDesktopComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidebarDesktopComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarDesktopComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
