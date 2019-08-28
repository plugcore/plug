import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugOverlayComponent } from './overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('PlugOverlayComponent', () => {
	let component: PlugOverlayComponent;
	let fixture: ComponentFixture<PlugOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [MatProgressSpinnerModule],
			declarations: [PlugOverlayComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
