import { TestBed, inject } from '@angular/core/testing';

import { ApiStatusService } from './status.service';

describe('ApiStatusService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ApiStatusService]
		});
	});

	it('should be created', inject([ApiStatusService], (service: ApiStatusService) => {
		expect(service).toBeTruthy();
	}));
});
