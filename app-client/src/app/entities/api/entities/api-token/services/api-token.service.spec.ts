import { TestBed, inject } from '@angular/core/testing';

import { TablesApiTokenService } from './api-token.service';

describe('TablesApiTokenService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TablesApiTokenService]
		});
	});

	it('should be created', inject([TablesApiTokenService], (service: TablesApiTokenService) => {
		expect(service).toBeTruthy();
	}));
});
