import { ApiLogModule } from './log.module';

describe('ApiLogModule', () => {
	let apiLogModule: ApiLogModule;

	beforeEach(() => {
		apiLogModule = new ApiLogModule( );
	});

	it('should create an instance', () => {
		expect(apiLogModule).toBeTruthy();
	});
});
