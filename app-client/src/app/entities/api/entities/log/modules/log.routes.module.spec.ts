import { ApiLogRoutesModule } from './log.routes.module';

describe('ApiLogRoutesModule', () => {
	let apiLogRoutesModule: ApiLogRoutesModule;

	beforeEach(() => {
		apiLogRoutesModule = new ApiLogRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiLogRoutesModule).toBeTruthy();
	});
});
