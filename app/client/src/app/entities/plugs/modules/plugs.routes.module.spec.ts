import { PlugsRoutesModule } from './plugs.routes.module';

describe('PlugsRoutesModule', () => {
	let plugsRoutesModule: PlugsRoutesModule;

	beforeEach(() => {
		plugsRoutesModule = new PlugsRoutesModule();
	});

	it('should create an instance', () => {
		expect(plugsRoutesModule).toBeTruthy();
	});
});
