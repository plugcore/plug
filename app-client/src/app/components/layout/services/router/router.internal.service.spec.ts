import { TestBed, inject } from '@angular/core/testing';
import { LayoutRouterService } from './router.internal.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutRouterService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [LayoutRouterService]
		});
	});

	it('should be created', inject([LayoutRouterService], (service: LayoutRouterService) => {
		expect(service).toBeTruthy();
	}));
});
