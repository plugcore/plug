import { MembershipRolesUpdateModule } from './update.module';

describe('MembershipRolesUpdateModule', () => {
	let membershipRolesUpdateModule: MembershipRolesUpdateModule;

	beforeEach(() => {
		membershipRolesUpdateModule = new MembershipRolesUpdateModule( );
	});

	it('should create an instance', () => {
		expect(membershipRolesUpdateModule).toBeTruthy();
	});
});
