import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiDesignerComponent } from './designer.component';

describe('ApiDesignerComponent', () => {
	let component: ApiDesignerComponent;
	let fixture: ComponentFixture<ApiDesignerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ApiDesignerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ApiDesignerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
