import { TestBed, inject } from '@angular/core/testing';

import { ScheduledJobsEventService } from './event.service';

describe('ScheduledJobsEventService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScheduledJobsEventService]
		});
	});

	it('should be created', inject([ScheduledJobsEventService], (service: ScheduledJobsEventService) => {
		expect(service).toBeTruthy();
	}));
});
