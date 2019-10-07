import { SystemRoutesModule } from './system.routes.module';

describe('SystemRoutesModule', () => {
	let systemRoutesModule: SystemRoutesModule;

	beforeEach(() => {
		systemRoutesModule = new SystemRoutesModule();
	});

	it('should create an instance', () => {
		expect(systemRoutesModule).toBeTruthy();
	});
});
