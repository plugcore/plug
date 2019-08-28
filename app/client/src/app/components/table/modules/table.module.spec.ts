import { PlugTableModule } from './table.module';

describe('TableModule', () => {
	let tableModule: PlugTableModule;

	beforeEach(() => {
		tableModule = new PlugTableModule();
	});

	it('should create an instance', () => {
		expect(tableModule).toBeTruthy();
	});
});
