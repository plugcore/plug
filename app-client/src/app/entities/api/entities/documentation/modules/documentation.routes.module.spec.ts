import { ApiDocumentationRoutesModule } from './documentation.routes.module';

describe('ApiDocumentationRoutesModule', () => {
	let apiDocumentationRoutesModule: ApiDocumentationRoutesModule;

	beforeEach(() => {
		apiDocumentationRoutesModule = new ApiDocumentationRoutesModule();
	});

	it('should create an instance', () => {
		expect(apiDocumentationRoutesModule).toBeTruthy();
	});
});
