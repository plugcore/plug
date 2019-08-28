import { MembershipRolesRoutesModule } from './roles.routes.module';

describe('MembershipRolesRoutesModule', () => {
	let membershipRolesRoutesModule: MembershipRolesRoutesModule;

	beforeEach(() => {
		membershipRolesRoutesModule = new MembershipRolesRoutesModule();
	});

	it('should create an instance', () => {
		expect(membershipRolesRoutesModule).toBeTruthy();
	});
});
