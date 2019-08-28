import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiStatusComponent } from './status.component';

describe('ApiStatusComponent', () => {
	let component: ApiStatusComponent;
	let fixture: ComponentFixture<ApiStatusComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiStatusComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
