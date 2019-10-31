import { ApiDocumentationModule } from './documentation.module';

describe('ApiDocumentationModule', () => {
	let apiDocumentationModule: ApiDocumentationModule;

	beforeEach(() => {
		apiDocumentationModule = new ApiDocumentationModule( );
	});

	it('should create an instance', () => {
		expect(apiDocumentationModule).toBeTruthy();
	});
});
