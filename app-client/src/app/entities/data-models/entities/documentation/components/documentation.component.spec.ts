import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelsDocumentationComponent } from './documentation.component';


describe('DataModelsDocumentationComponent', () => {
	let component: DataModelsDocumentationComponent;
	let fixture: ComponentFixture<DataModelsDocumentationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DataModelsDocumentationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataModelsDocumentationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
