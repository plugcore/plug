import { ApiApiTokenUpdateModule } from './update.module';

describe('ApiApiTokenUpdateModule', () => {
	let apiApiTokenUpdateModule: ApiApiTokenUpdateModule;

	beforeEach(() => {
		apiApiTokenUpdateModule = new ApiApiTokenUpdateModule( );
	});

	it('should create an instance', () => {
		expect(apiApiTokenUpdateModule).toBeTruthy();
	});
});
