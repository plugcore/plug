import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavComponent } from './nav.component';
import { MatIcon } from '@angular/material/icon';

describe('SidebarNavComponent', () => {
	let component: SidebarNavComponent;
	let fixture: ComponentFixture<SidebarNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SidebarNavComponent, MatIcon]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
