import { SystemConfigurationRoutesModule } from './configuration.routes.module';

describe('SystemConfigurationRoutesModule', () => {
	let systemConfigurationRoutesModule: SystemConfigurationRoutesModule;

	beforeEach(() => {
		systemConfigurationRoutesModule = new SystemConfigurationRoutesModule();
	});

	it('should create an instance', () => {
		expect(systemConfigurationRoutesModule).toBeTruthy();
	});
});
