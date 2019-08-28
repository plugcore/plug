import { TestBed, inject } from '@angular/core/testing';

import { DatabasesService } from './databases.service';

describe('DatabasesService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DatabasesService]
		});
	});

	it('should be created', inject([DatabasesService], (service: DatabasesService) => {
		expect(service).toBeTruthy();
	}));
});
