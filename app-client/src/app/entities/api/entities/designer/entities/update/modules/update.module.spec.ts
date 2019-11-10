import { ApiDesignerUpdateModule } from './update.module';

describe('ApiDesignerUpdateModule', () => {
	let apiApiDesignerUpdateModule: ApiDesignerUpdateModule;

	beforeEach(() => {
		apiApiDesignerUpdateModule = new ApiDesignerUpdateModule( );
	});

	it('should create an instance', () => {
		expect(apiApiDesignerUpdateModule).toBeTruthy();
	});
});
