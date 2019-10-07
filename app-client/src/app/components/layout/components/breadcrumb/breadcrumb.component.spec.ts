import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBreadcrumbComponent } from './breadcrumb.component';

describe('LayoutBreadcrumbComponent', () => {
	let component: LayoutBreadcrumbComponent;
	let fixture: ComponentFixture<LayoutBreadcrumbComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LayoutBreadcrumbComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutBreadcrumbComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
