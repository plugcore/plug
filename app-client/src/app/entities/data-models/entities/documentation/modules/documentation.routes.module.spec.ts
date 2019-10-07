import { DataModelsDocumentationRoutesModule } from './documentation.routes.module';

describe('DataModelsDocumentationRoutesModule', () => {
	let dataModelsDocumentationRoutesModule: DataModelsDocumentationRoutesModule;

	beforeEach(() => {
		dataModelsDocumentationRoutesModule = new DataModelsDocumentationRoutesModule();
	});

	it('should create an instance', () => {
		expect(dataModelsDocumentationRoutesModule).toBeTruthy();
	});
});
