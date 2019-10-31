import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlugDialogComponent } from './dialog.component';
import { MatIcon } from '@angular/material/icon';
describe('DialogComponent', () => {
	let component: PlugDialogComponent;
	let fixture: ComponentFixture<PlugDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugDialogComponent, MatIcon]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
