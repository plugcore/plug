import { MembershipRolesUpdateRoutesModule } from './update.routes.module';

describe('MembershipRolesUpdateRoutesModule', () => {
	let membershipRolesUpdateRoutesModule: MembershipRolesUpdateRoutesModule;

	beforeEach(() => {
		membershipRolesUpdateRoutesModule = new MembershipRolesUpdateRoutesModule();
	});

	it('should create an instance', () => {
		expect(membershipRolesUpdateRoutesModule).toBeTruthy();
	});
});
