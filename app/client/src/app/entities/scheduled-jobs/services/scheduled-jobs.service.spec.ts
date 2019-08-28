import { TestBed, inject } from '@angular/core/testing';

import { ScheduledJobsService } from './scheduled-jobs.service';

describe('ScheduledJobsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScheduledJobsService]
		});
	});

	it('should be created', inject([ScheduledJobsService], (service: ScheduledJobsService) => {
		expect(service).toBeTruthy();
	}));
});
