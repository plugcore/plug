import { DataModelsModule } from './data-models.module';

describe('DataModelsModule', () => {
	let dataModelsModule: DataModelsModule;

	beforeEach(() => {
		dataModelsModule = new DataModelsModule( );
	});

	it('should create an instance', () => {
		expect(dataModelsModule).toBeTruthy();
	});
});
