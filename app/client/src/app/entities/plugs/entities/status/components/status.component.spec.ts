import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlugsStatusComponent } from './status.component';

describe('PlugsStatusComponent', () => {
	let component: PlugsStatusComponent;
	let fixture: ComponentFixture<PlugsStatusComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugsStatusComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugsStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
