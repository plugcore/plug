import { ApiDesignerModule } from './designer.module';

describe('ApiDesignerModule', () => {
	let apiApiDesignerModule: ApiDesignerModule;

	beforeEach(() => {
		apiApiDesignerModule = new ApiDesignerModule( );
	});

	it('should create an instance', () => {
		expect(apiApiDesignerModule).toBeTruthy();
	});
});
