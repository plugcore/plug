import { MembershipModule } from './membership.module';

describe('MembershipModule', () => {
	let membershipModule: MembershipModule;

	beforeEach(() => {
		membershipModule = new MembershipModule( );
	});

	it('should create an instance', () => {
		expect(membershipModule).toBeTruthy();
	});
});
