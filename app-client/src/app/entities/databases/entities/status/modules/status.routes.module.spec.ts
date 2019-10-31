import { DatabasesStatusRoutesModule } from './status.routes.module';

describe('DatabasesStatusRoutesModule', () => {
	let databasesStatusRoutesModule: DatabasesStatusRoutesModule;

	beforeEach(() => {
		databasesStatusRoutesModule = new DatabasesStatusRoutesModule();
	});

	it('should create an instance', () => {
		expect(databasesStatusRoutesModule).toBeTruthy();
	});
});
