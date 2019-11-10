import { ApiDesignerRoutesModule } from './designer.routes.module';

describe('ApiDesignerRoutesModule', () => {
	let apiApiDesignerRoutesModule: ApiDesignerRoutesModule;

	beforeEach(() => {
		apiApiDesignerRoutesModule = new ApiDesignerRoutesModule();
	});

	it('should create an instance', () => {
		expect(ApiDesignerRoutesModule).toBeTruthy();
	});
});
