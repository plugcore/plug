import { ApiApiTokenRoutesModule } from './api-token.routes.module';

describe('ApiApiTokenRoutesModule', () => {
	let apiApiTokenRoutesModule: ApiApiTokenRoutesModule;

	beforeEach(() => {
		apiApiTokenRoutesModule = new ApiApiTokenRoutesModule();
	});

	it('should create an instance', () => {
		expect(ApiApiTokenRoutesModule).toBeTruthy();
	});
});
