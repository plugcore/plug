import { ApiRoutesModule } from './api.routes.module';

describe('ApiRoutesModule', () => {
	let apiRoutesModule: ApiRoutesModule;

	beforeEach(() => {
		apiRoutesModule = new ApiRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiRoutesModule).toBeTruthy();
	});
});
