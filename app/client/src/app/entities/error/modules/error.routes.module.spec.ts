import { ErrorRoutesModule } from './error.routes.module';

describe('ErrorRoutesModule', () => {
	let errorRoutesModule: ErrorRoutesModule;

	beforeEach(() => {
		errorRoutesModule = new ErrorRoutesModule();
	});

	it('should create an instance', () => {
		expect(errorRoutesModule).toBeTruthy();
	});
});
