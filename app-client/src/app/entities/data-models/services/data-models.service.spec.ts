import { TestBed, inject } from '@angular/core/testing';

import { DataModelsService } from './data-models.service';

describe('DataModelsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DataModelsService]
		});
	});

	it('should be created', inject([DataModelsService], (service: DataModelsService) => {
		expect(service).toBeTruthy();
	}));
});
