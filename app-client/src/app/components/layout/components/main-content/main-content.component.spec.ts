import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainContentComponent } from './main-content.component';

describe('LayoutMainContentComponent', () => {
	let component: LayoutMainContentComponent;
	let fixture: ComponentFixture<LayoutMainContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LayoutMainContentComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutMainContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
