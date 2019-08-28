import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { Error404Component } from './404.component';


describe('Error404Component', () => {
	let component: Error404Component;
	let fixture: ComponentFixture<Error404Component>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Error404Component, MatIcon]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Error404Component);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
