import { PlugsDocumentationRoutesModule } from './documentation.routes.module';

describe('PlugsDocumentationRoutesModule', () => {
	let plugsDocumentationRoutesModule: PlugsDocumentationRoutesModule;

	beforeEach(() => {
		plugsDocumentationRoutesModule = new PlugsDocumentationRoutesModule();
	});

	it('should create an instance', () => {
		expect(plugsDocumentationRoutesModule).toBeTruthy();
	});
});
