import { TestBed, inject } from '@angular/core/testing';

import { PlugsLogService } from './log.service';

describe('PlugsLogService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PlugsLogService]
		});
	});

	it('should be created', inject([PlugsLogService], (service: PlugsLogService) => {
		expect(service).toBeTruthy();
	}));
});
