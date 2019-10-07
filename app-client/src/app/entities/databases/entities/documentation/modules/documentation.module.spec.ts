import { DatabasesDocumentationModule } from './documentation.module';

describe('DatabasesDocumentationModule', () => {
	let databasesDocumentationModule: DatabasesDocumentationModule;

	beforeEach(() => {
		databasesDocumentationModule = new DatabasesDocumentationModule( );
	});

	it('should create an instance', () => {
		expect(databasesDocumentationModule).toBeTruthy();
	});
});
