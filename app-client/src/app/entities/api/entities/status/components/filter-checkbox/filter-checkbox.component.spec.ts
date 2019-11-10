import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatusFilterCheckboxComponent } from './filter-checkbox.component';

describe('ApiStatusFilterCheckboxComponent', () => {
	let component: ApiStatusFilterCheckboxComponent;
	let fixture: ComponentFixture<ApiStatusFilterCheckboxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiStatusFilterCheckboxComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiStatusFilterCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
