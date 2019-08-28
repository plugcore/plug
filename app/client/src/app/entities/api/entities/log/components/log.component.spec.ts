import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiLogComponent } from './log.component';

describe('ApiLogComponent', () => {
	let component: ApiLogComponent;
	let fixture: ComponentFixture<ApiLogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiLogComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiLogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
