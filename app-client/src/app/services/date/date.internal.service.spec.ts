import { TestBed, inject } from '@angular/core/testing';
import { DateInternalService } from './date.internal.service';


describe('DateInternalService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DateInternalService]
		});
	});

	it('should be created', inject([DateInternalService], (service: DateInternalService) => {
		expect(service).toBeTruthy();
	}));
});
