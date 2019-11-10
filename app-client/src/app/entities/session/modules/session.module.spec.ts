import { SessionModule } from './session.module';

describe('SessionModule', () => {
	let sessionModule: SessionModule;

	beforeEach(() => {
		sessionModule = new SessionModule( );
	});

	it('should create an instance', () => {
		expect(sessionModule).toBeTruthy();
	});
});
