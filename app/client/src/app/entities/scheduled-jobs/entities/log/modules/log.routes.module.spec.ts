import { PlugsLogRoutesModule } from './log.routes.module';

describe('PlugsLogRoutesModule', () => {
	let plugsLogRoutesModule: PlugsLogRoutesModule;

	beforeEach(() => {
		plugsLogRoutesModule = new PlugsLogRoutesModule();
	});

	it('should create an instance', () => {
		expect(plugsLogRoutesModule).toBeTruthy();
	});
});
