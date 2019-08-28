import { TestBed, inject } from '@angular/core/testing';

import { DatabasesLogService } from './log.service';

describe('DatabasesLogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DatabasesLogService]
		});
	});

	it('should be created', inject([DatabasesLogService], (service: DatabasesLogService) => {
		expect(service).toBeTruthy();
	}));
});
