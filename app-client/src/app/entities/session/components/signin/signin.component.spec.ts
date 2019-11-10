import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBar } from '@angular/material';
import { SessionSigninComponent } from './signin.component';


describe('SessionSigninComponent', () => {
	let component: SessionSigninComponent;
	let fixture: ComponentFixture<SessionSigninComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SessionSigninComponent, MatProgressBar]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SessionSigninComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
