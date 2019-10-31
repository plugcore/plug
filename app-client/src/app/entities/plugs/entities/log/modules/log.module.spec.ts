import { PlugsLogModule } from './log.module';

describe('PlugsLogModule', () => {
	let plugsLogModule: PlugsLogModule;

	beforeEach(() => {
		plugsLogModule = new PlugsLogModule( );
	});

	it('should create an instance', () => {
		expect(plugsLogModule).toBeTruthy();
	});
});
