import { DatabasesDocumentationRoutesModule } from './documentation.routes.module';

describe('DatabasesDocumentationRoutesModule', () => {
	let databasesDocumentationRoutesModule: DatabasesDocumentationRoutesModule;

	beforeEach(() => {
		databasesDocumentationRoutesModule = new DatabasesDocumentationRoutesModule();
	});

	it('should create an instance', () => {
		expect(databasesDocumentationRoutesModule).toBeTruthy();
	});
});
