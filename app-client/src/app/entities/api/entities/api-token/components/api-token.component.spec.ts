import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiApiTokenComponent } from './api-token.component';

describe('ApiApiTokenComponent', () => {
	let component: ApiApiTokenComponent;
	let fixture: ComponentFixture<ApiApiTokenComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiApiTokenComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiApiTokenComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
