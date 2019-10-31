import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasesDocumentationComponent } from './documentation.component';


describe('DatabasesDocumentationComponent', () => {
	let component: DatabasesDocumentationComponent;
	let fixture: ComponentFixture<DatabasesDocumentationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DatabasesDocumentationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DatabasesDocumentationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
