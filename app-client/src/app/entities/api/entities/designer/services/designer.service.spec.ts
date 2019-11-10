import { TestBed, inject } from '@angular/core/testing';

import { TablesApiDesignerService } from './designer.service';

describe('TablesApiDesignerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TablesApiDesignerService]
		});
	});

	it('should be created', inject([TablesApiDesignerService], (service: TablesApiDesignerService) => {
		expect(service).toBeTruthy();
	}));
});
