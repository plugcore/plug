import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModelsDocumentationInfoComponent } from './info.component';

describe('DataModelsDocumentationInfoComponent', () => {
	let component: DataModelsDocumentationInfoComponent;
	let fixture: ComponentFixture<DataModelsDocumentationInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DataModelsDocumentationInfoComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataModelsDocumentationInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
