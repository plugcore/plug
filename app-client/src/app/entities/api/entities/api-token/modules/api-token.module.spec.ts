import { ApiApiTokenModule } from './api-token.module';

describe('ApiApiTokenModule', () => {
	let apiApiTokenModule: ApiApiTokenModule;

	beforeEach(() => {
		apiApiTokenModule = new ApiApiTokenModule( );
	});

	it('should create an instance', () => {
		expect(apiApiTokenModule).toBeTruthy();
	});
});
