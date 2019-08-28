import { PlugsStatusRoutesModule } from './status.routes.module';

describe('PlugsStatusRoutesModule', () => {
	let plugsStatusRoutesModule: PlugsStatusRoutesModule;

	beforeEach(() => {
		plugsStatusRoutesModule = new PlugsStatusRoutesModule();
	});

	it('should create an instance', () => {
		expect(plugsStatusRoutesModule).toBeTruthy();
	});
});
