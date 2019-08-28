import { MembershipUsersModule } from './users.module';

describe('MembershipUsersModule', () => {
	let membershipUsersModule: MembershipUsersModule;

	beforeEach(() => {
		membershipUsersModule = new MembershipUsersModule( );
	});

	it('should create an instance', () => {
		expect(membershipUsersModule).toBeTruthy();
	});
});
