import { MembershipRoutesModule } from './membership.routes.module';

describe('MembershipRoutesModule', () => {
	let membershipRoutesModule: MembershipRoutesModule;

	beforeEach(() => {
		membershipRoutesModule = new MembershipRoutesModule();
	});

	it('should create an instance', () => {
		expect(membershipRoutesModule).toBeTruthy();
	});
});
