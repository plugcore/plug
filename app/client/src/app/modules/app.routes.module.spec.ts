import { AppRoutesModule } from './app.routes.module';

describe('AppRoutesModule', () => {
	let appRoutesModule: AppRoutesModule;

	beforeEach(() => {
		appRoutesModule = new AppRoutesModule();
	});

	it('should create an instance', () => {
		expect(appRoutesModule).toBeTruthy();
	});
});
