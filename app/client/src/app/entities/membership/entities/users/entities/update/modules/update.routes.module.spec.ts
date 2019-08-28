import { MembershipUsersUpdateRoutesModule } from './update.routes.module';

describe('MembershipUsersUpdateRoutesModule', () => {
	let membershipUsersUpdateRoutesModule: MembershipUsersUpdateRoutesModule;

	beforeEach(() => {
		membershipUsersUpdateRoutesModule = new MembershipUsersUpdateRoutesModule();
	});

	it('should create an instance', () => {
		expect(membershipUsersUpdateRoutesModule).toBeTruthy();
	});
});
