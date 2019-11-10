import { ApiApiTokenUpdateRoutesModule } from './update.routes.module';

describe('ApiApiTokenUpdateRoutesModule', () => {
	let apiApiTokenUpdateRoutesModule: ApiApiTokenUpdateRoutesModule;

	beforeEach(() => {
		apiApiTokenUpdateRoutesModule = new ApiApiTokenUpdateRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiApiTokenUpdateRoutesModule).toBeTruthy();
	});
});
