import { DataModelsRoutesModule } from './data-models.routes.module';

describe('DataModelsRoutesModule', () => {
	let dataModelsRoutesModule: DataModelsRoutesModule;

	beforeEach(() => {
		dataModelsRoutesModule = new DataModelsRoutesModule();
	});

	it('should create an instance', () => {
		expect(dataModelsRoutesModule).toBeTruthy();
	});
});
