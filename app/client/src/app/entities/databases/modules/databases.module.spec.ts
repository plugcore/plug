import { DatabasesModule } from './databases.module';

describe('DatabasesModule', () => {
	let databasesModule: DatabasesModule;

	beforeEach(() => {
		databasesModule = new DatabasesModule( );
	});

	it('should create an instance', () => {
		expect(databasesModule).toBeTruthy();
	});
});
