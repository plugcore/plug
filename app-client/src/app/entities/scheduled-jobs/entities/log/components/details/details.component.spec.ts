import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledJobsLogDetailsComponent } from './details.component';

describe('ScheduledJobsLogDetailsComponent', () => {
	let component: ScheduledJobsLogDetailsComponent;
	let fixture: ComponentFixture<ScheduledJobsLogDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ScheduledJobsLogDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduledJobsLogDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
