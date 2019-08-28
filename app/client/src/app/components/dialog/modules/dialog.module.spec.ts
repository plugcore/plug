import { PlugDialogModule } from './dialog.module';

describe('plugDialogModule', () => {
	let plugDialogModule: PlugDialogModule;

	beforeEach(() => {
		plugDialogModule = new PlugDialogModule();
	});

	it('should create an instance', () => {
		expect(plugDialogModule).toBeTruthy();
	});
});
