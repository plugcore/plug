import { MembershipRolesModule } from './roles.module';

describe('MembershipRolesModule', () => {
	let membershipRolesModule: MembershipRolesModule;

	beforeEach(() => {
		membershipRolesModule = new MembershipRolesModule( );
	});

	it('should create an instance', () => {
		expect(membershipRolesModule).toBeTruthy();
	});
});
