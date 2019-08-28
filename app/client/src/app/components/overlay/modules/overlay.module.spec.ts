import { PlugOverlayModule } from './overlay.module';

describe('PlugOverlayModule', () => {
	let plugOverlayModule: PlugOverlayModule;

	beforeEach(() => {
		plugOverlayModule = new PlugOverlayModule();
	});

	it('should create an instance', () => {
		expect(plugOverlayModule).toBeTruthy();
	});
});
