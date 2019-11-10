import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlugsStatusInfoComponent } from './info.component';

describe('PlugsStatusInfoComponent', () => {
	let component: PlugsStatusInfoComponent;
	let fixture: ComponentFixture<PlugsStatusInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugsStatusInfoComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugsStatusInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
