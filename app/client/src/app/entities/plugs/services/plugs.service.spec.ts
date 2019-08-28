import { TestBed, inject } from '@angular/core/testing';

import { PlugsService } from './plugs.service';

describe('PlugsService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PlugsService]
		});
	});

	it('should be created', inject([PlugsService], (service: PlugsService) => {
		expect(service).toBeTruthy();
	}));
});
