import { ErrorModule } from './error.module';

describe('ErrorModule', () => {
	let errorModule: ErrorModule;

	beforeEach(() => {
		errorModule = new ErrorModule( );
	});

	it('should create an instance', () => {
		expect(errorModule).toBeTruthy();
	});
});
