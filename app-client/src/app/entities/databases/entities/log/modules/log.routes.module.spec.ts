import { DatabasesLogRoutesModule } from './log.routes.module';

describe('DatabasesLogRoutesModule', () => {
	let databasesLogRoutesModule: DatabasesLogRoutesModule;

	beforeEach(() => {
		databasesLogRoutesModule = new DatabasesLogRoutesModule();
	});

	it('should create an instance', () => {
		expect(databasesLogRoutesModule).toBeTruthy();
	});
});
