/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Test, TestClass, BeforeTests } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ConfigurationLoader } from '../../src/configuration/configuration.loader';
import { join } from 'path';

@TestClass()
export class ConfigurationLoaderTest extends PlugTest {

	private readonly testFilesFolder = join(__dirname, '..', '..', '..', 'test', 'configuration', 'test-files');

	@BeforeTests()
	public beforeTests() {
		process.env.NODE_LOG_LEVEL = 'debug';
		process.env.NODE_ENV = 'env';
	}

	@Test()
	public async loadApp() {

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
			'log': {}
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
