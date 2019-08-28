import { TestBed, inject } from '@angular/core/testing';

import { TablesUsersService } from './users.service';

describe('TablesUsersService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TablesUsersService]
		});
	});

	it('should be created', inject([TablesUsersService], (service: TablesUsersService) => {
		expect(service).toBeTruthy();
	}));
});
