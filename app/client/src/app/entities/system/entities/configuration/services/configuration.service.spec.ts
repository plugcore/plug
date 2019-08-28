import { TestBed, inject } from '@angular/core/testing';

import { SystemConfigurationService } from './configuration.service';

describe('SystemConfigurationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SystemConfigurationService]
		});
	});

	it('should be created', inject([SystemConfigurationService], (service: SystemConfigurationService) => {
		expect(service).toBeTruthy();
	}));
});
