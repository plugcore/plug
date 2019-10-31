import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MembershipRolesComponent } from './roles.component';

describe('MembershipRolesComponent', () => {
	let component: MembershipRolesComponent;
	let fixture: ComponentFixture<MembershipRolesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MembershipRolesComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MembershipRolesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
