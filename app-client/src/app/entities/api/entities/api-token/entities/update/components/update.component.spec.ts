import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiApiTokenUpdateComponent } from './update.component';

describe('ApiApiTokenUpdateComponent', () => {
	let component: ApiApiTokenUpdateComponent;
	let fixture: ComponentFixture<ApiApiTokenUpdateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiApiTokenUpdateComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiApiTokenUpdateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
