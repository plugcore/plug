import { SystemConfigurationModule } from './configuration.module';

describe('SystemConfigurationModule', () => {
	let systemConfigurationModule: SystemConfigurationModule;

	beforeEach(() => {
		systemConfigurationModule = new SystemConfigurationModule( );
	});

	it('should create an instance', () => {
		expect(systemConfigurationModule).toBeTruthy();
	});
});
