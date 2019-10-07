import { DataModelsDocumentationModule } from './documentation.module';

describe('DataModelsDocumentationModule', () => {
	let dataModelsDocumentationModule: DataModelsDocumentationModule;

	beforeEach(() => {
		dataModelsDocumentationModule = new DataModelsDocumentationModule( );
	});

	it('should create an instance', () => {
		expect(dataModelsDocumentationModule).toBeTruthy();
	});
});
