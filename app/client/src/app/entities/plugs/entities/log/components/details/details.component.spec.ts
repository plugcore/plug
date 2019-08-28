import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugsLogDetailsComponent } from './details.component';

describe('PlugsLogDetailsComponent', () => {
	let component: PlugsLogDetailsComponent;
	let fixture: ComponentFixture<PlugsLogDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugsLogDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugsLogDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
