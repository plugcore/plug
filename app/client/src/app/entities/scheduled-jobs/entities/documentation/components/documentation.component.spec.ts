import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledJobsDocumentationComponent } from './documentation.component';


describe('ScheduledJobsDocumentationComponent', () => {
	let component: ScheduledJobsDocumentationComponent;
	let fixture: ComponentFixture<ScheduledJobsDocumentationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ScheduledJobsDocumentationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduledJobsDocumentationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
