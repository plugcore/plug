import { SessionRoutesModule } from './session.routes.module';

describe('SessionRoutesModule', () => {
	let sessionRoutesModule: SessionRoutesModule;

	beforeEach(() => {
		sessionRoutesModule = new SessionRoutesModule();
	});

	it('should create an instance', () => {
		expect(sessionRoutesModule).toBeTruthy();
	});
});
