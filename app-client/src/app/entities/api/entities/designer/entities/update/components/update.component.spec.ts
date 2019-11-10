import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiDesignerUpdateComponent } from './update.component';

describe('ApiDesignerUpdateComponent', () => {
	let component: ApiDesignerUpdateComponent;
	let fixture: ComponentFixture<ApiDesignerUpdateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiDesignerUpdateComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiDesignerUpdateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
