import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugDialogConfirmComponent } from './confirm.component';

describe('PlugDialogConfirmComponent', () => {
	let component: PlugDialogConfirmComponent;
	let fixture: ComponentFixture<PlugDialogConfirmComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugDialogConfirmComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugDialogConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
