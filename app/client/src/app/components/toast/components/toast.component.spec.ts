import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugToastComponent } from './toast.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

describe('PlugToastComponent', () => {
	let component: PlugToastComponent;
	let fixture: ComponentFixture<PlugToastComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugToastComponent],
			providers: [MatSnackBarModule, {
				provide: MatSnackBarRef,
				useValue: {}
			}, {
					provide: MAT_SNACK_BAR_DATA,
					useValue: {} // Add any data you wish to test if it is passed/used correctly
				}]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
