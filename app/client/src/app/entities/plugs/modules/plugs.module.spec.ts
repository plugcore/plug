import { PlugsModule } from './plugs.module';

describe('PlugsModule', () => {
	let plugsModule: PlugsModule;

	beforeEach(() => {
		plugsModule = new PlugsModule( );
	});

	it('should create an instance', () => {
		expect(plugsModule).toBeTruthy();
	});
});
