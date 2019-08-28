import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugsDocumentationComponent } from './documentation.component';


describe('PlugsDocumentationComponent', () => {
	let component: PlugsDocumentationComponent;
	let fixture: ComponentFixture<PlugsDocumentationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlugsDocumentationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlugsDocumentationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
