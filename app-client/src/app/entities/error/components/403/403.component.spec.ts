import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { Error403Component } from './403.component';


describe('Error403Component', () => {
	let component: Error403Component;
	let fixture: ComponentFixture<Error403Component>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Error403Component, MatIcon]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Error403Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
