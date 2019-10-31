import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUsersComponent } from './users.component';


describe('MembershipUsersComponent', () => {
	let component: MembershipUsersComponent;
	let fixture: ComponentFixture<MembershipUsersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MembershipUsersComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MembershipUsersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
