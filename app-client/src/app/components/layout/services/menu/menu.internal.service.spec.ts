import { TestBed, inject } from '@angular/core/testing';
import { LayoutMenuService } from './menu.internal.service';

describe('LayoutMenuService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LayoutMenuService]
		});
	});

	it('should be created', inject([LayoutMenuService], (service: LayoutMenuService) => {
		expect(service).toBeTruthy();
	}));
});
