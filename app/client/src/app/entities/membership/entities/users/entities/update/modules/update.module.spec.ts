import { MembershipUsersUpdateModule } from './update.module';

describe('MembershipUsersUpdateModule', () => {
	let membershipUsersUpdateModule: MembershipUsersUpdateModule;

	beforeEach(() => {
		membershipUsersUpdateModule = new MembershipUsersUpdateModule( );
	});

	it('should create an instance', () => {
		expect(membershipUsersUpdateModule).toBeTruthy();
	});
});
