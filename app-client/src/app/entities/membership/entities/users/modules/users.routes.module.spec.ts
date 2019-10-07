import { MembershipUsersRoutesModule } from './users.routes.module';

describe('MembershipUsersRoutesModule', () => {
	let membershipUsersRoutesModule: MembershipUsersRoutesModule;

	beforeEach(() => {
		membershipUsersRoutesModule = new MembershipUsersRoutesModule();
	});

	it('should create an instance', () => {
		expect(membershipUsersRoutesModule).toBeTruthy();
	});
});
