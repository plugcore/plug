import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlugsLogComponent } from './log.component';

describe('PlugsLogComponent', () => {
	let component: PlugsLogComponent;
	let fixture: ComponentFixture<PlugsLogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugsLogComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugsLogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
