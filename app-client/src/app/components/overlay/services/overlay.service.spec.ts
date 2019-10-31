import { inject, TestBed } from '@angular/core/testing';

import { PlugOverlayService } from './overlay.service';
import { Overlay } from '@angular/cdk/overlay';

describe('PlugOverlayService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PlugOverlayService, Overlay]
		});
	});

	it('should be created', inject([PlugOverlayService], (service: PlugOverlayService) => {
		expect(service).toBeTruthy();
	}));
});
