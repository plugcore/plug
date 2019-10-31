import { TestBed, inject } from '@angular/core/testing';

import { ScheduledJobsLogService } from './log.service';

describe('ScheduledJobsLogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ScheduledJobsLogService]
		});
	});

	it('should be created', inject([ScheduledJobsLogService], (service: ScheduledJobsLogService) => {
		expect(service).toBeTruthy();
	}));
});
