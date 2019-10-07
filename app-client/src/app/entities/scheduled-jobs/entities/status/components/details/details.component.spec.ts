import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledJobsStatusDetailsComponent } from './details.component';

describe('ScheduledJobsStatusDetailsComponent', () => {
	let component: ScheduledJobsStatusDetailsComponent;
	let fixture: ComponentFixture<ScheduledJobsStatusDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ScheduledJobsStatusDetailsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduledJobsStatusDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
