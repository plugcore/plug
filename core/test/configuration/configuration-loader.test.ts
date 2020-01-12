import { Test, TestService, BeforeTests } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { ConfigurationLoader } from '../../src/configuration/configuration.loader';
import { join } from 'path';
import { CustomConfigurationService } from './customconfiguration.service';
import { Container } from '../../src/dependecy-injection/di.container';

@TestService()
export class ConfigurationLoaderTest extends AsserterService {

	private customConfigurationService: CustomConfigurationService;
	private readonly testFilesFolder = join(__dirname, '..', '..', '..', 'test', 'configuration', 'test-files');

	@BeforeTests()
	public async beforeTests() {
		process.env.NODE_LOG_LEVEL = 'debug';
		process.env.NODE_ENV = 'env';
		this.customConfigurationService = await Container.get(CustomConfigurationService);
	}

	@Test()
	public async injectConfiguration() {
		this.assert.ok(this.customConfigurationService.getConfiguration().init);
		this.assert.ok(this.customConfigurationService.getConfiguration().log);
	}

	@Test()
	public async loadProjectConfiguration() {

		const importedAppCfg = await ConfigurationLoader.loadProject(this.testFilesFolder);
		const appCfg = {
			'init': { 'distFolder': 'dist' },
			'custom': {
				'a': 1,
				'import': {
					'test1': 2,
					'test2': ['3', '4'],
					'test4': 'Only NON env json',
					'test3': 'Only env json'
				},
				'env': 'debug',
				'sub': {
					'a': 1, 'b': { 'c': 2, 'd': ['3', '4'] },
					'e': 'Only env'
				}
			},
			'log': {},
			'connections': {}
		};
		this.assert.deepEqual(importedAppCfg, appCfg);

	}

	@Test()
	public async loadFile() {

		const importedCfg = await ConfigurationLoader.loadFile(this.testFilesFolder);
		const cfg = {
			'custom': {
				'a': 1,
				'import': {
					'test1': 2,
					'test2': ['3', '4'],
					'test4': 'Only NON env json',
					'test3': 'Only env json'
				},
				'env': 'debug',
				'sub': {
					'a': 1, 'b': { 'c': 2, 'd': ['3', '4'] },
					'e': 'Only env'
				}
			}
		};
		this.assert.deepEqual(importedCfg, cfg);

	}

}
