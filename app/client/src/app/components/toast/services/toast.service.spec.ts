import { TestBed, inject } from '@angular/core/testing';

import { PlugToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('PlugToastService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PlugToastService, MatSnackBar, Overlay]
		});
	});

	it('should be created', inject([PlugToastService], (service: PlugToastService) => {
		expect(service).toBeTruthy();
	}));
});
