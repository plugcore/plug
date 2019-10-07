import { TestBed, inject } from '@angular/core/testing';

import { ApiLogService } from './log.service';

describe('ApiLogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ApiLogService]
		});
	});

	it('should be created', inject([ApiLogService], (service: ApiLogService) => {
		expect(service).toBeTruthy();
	}));
});
