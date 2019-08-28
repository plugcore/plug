import { DatabasesStatusModule } from './status.module';

describe('DatabasesStatusModule', () => {
	let databasesStatusModule: DatabasesStatusModule;

	beforeEach(() => {
		databasesStatusModule = new DatabasesStatusModule( );
	});

	it('should create an instance', () => {
		expect(databasesStatusModule).toBeTruthy();
	});
});
