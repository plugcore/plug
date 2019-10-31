import { ApiModule } from './api.module';

describe('ApiModule', () => {
	let apiModule: ApiModule;

	beforeEach(() => {
		apiModule = new ApiModule( );
	});

	it('should create an instance', () => {
		expect(apiModule).toBeTruthy();
	});
});
