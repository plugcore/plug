import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { inject, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { PlugDialogService } from './dialog.service';


describe('PlugDialogService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatDialogModule, OverlayModule],
			declarations: [],
			providers: [PlugDialogService, ]
		});
	});

	it('should be created', inject([PlugDialogService], (service: PlugDialogService) => {
		expect(service).toBeTruthy();
	}));
});
