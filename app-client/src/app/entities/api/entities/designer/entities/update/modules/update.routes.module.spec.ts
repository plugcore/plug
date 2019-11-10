import { ApiDesignerUpdateRoutesModule } from './update.routes.module';

describe('ApiDesignerUpdateRoutesModule', () => {
	let apiApiDesignerUpdateRoutesModule: ApiDesignerUpdateRoutesModule;

	beforeEach(() => {
		apiApiDesignerUpdateRoutesModule = new ApiDesignerUpdateRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiApiDesignerUpdateRoutesModule).toBeTruthy();
	});
});
