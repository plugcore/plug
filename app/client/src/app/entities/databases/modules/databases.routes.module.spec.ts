import { DatabasesRoutesModule } from './databases.routes.module';

describe('DatabasesRoutesModule', () => {
	let databasesRoutesModule: DatabasesRoutesModule;

	beforeEach(() => {
		databasesRoutesModule = new DatabasesRoutesModule();
	});

	it('should create an instance', () => {
		expect(databasesRoutesModule).toBeTruthy();
	});
});
