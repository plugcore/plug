import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLogDetailsComponent } from './details.component';

describe('ApiLogDetailsComponent', () => {
	let component: ApiLogDetailsComponent;
	let fixture: ComponentFixture<ApiLogDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiLogDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiLogDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
