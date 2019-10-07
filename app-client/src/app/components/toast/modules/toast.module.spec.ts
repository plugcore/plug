import { PlugToastModule } from './toast.module';

describe('PlugToastModule', () => {
	let plugToastModule: PlugToastModule;

	beforeEach(() => {
		plugToastModule = new PlugToastModule();
	});

	it('should create an instance', () => {
		expect(plugToastModule).toBeTruthy();
	});
});
