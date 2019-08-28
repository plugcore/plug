import { TestBed, inject } from '@angular/core/testing';

import { TablesRolesService } from './roles.service';

describe('TablesRolesService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TablesRolesService]
		});
	});

	it('should be created', inject([TablesRolesService], (service: TablesRolesService) => {
		expect(service).toBeTruthy();
	}));
});
