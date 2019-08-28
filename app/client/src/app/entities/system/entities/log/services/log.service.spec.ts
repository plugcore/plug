import { TestBed, inject } from '@angular/core/testing';

import { SystemLogService } from './log.service';

describe('SystemLogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SystemLogService]
		});
	});

	it('should be created', inject([SystemLogService], (service: SystemLogService) => {
		expect(service).toBeTruthy();
	}));
});
