import { PlugsDocumentationModule } from './documentation.module';

describe('PlugsDocumentationModule', () => {
	let plugsDocumentationModule: PlugsDocumentationModule;

	beforeEach(() => {
		plugsDocumentationModule = new PlugsDocumentationModule( );
	});

	it('should create an instance', () => {
		expect(plugsDocumentationModule).toBeTruthy();
	});
});
