import { DatabasesLogModule } from './log.module';

describe('DatabasesLogModule', () => {
	let databasesLogModule: DatabasesLogModule;

	beforeEach(() => {
		databasesLogModule = new DatabasesLogModule( );
	});

	it('should create an instance', () => {
		expect(databasesLogModule).toBeTruthy();
	});
});
