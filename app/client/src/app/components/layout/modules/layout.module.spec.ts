import { PlugLayoutModule } from './layout.module';

describe('PlugLayoutModule', () => {
	let plugLayoutModule: PlugLayoutModule;

	beforeEach(() => {
		plugLayoutModule = new PlugLayoutModule();
	});

	it('should create an instance', () => {
		expect(plugLayoutModule).toBeTruthy();
	});
});
