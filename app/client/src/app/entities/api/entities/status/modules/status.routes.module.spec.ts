import { ApiStatusRoutesModule } from './status.routes.module';

describe('ApiStatusRoutesModule', () => {
	let apiStatusRoutesModule: ApiStatusRoutesModule;

	beforeEach(() => {
		apiStatusRoutesModule = new ApiStatusRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiStatusRoutesModule).toBeTruthy();
	});
});
