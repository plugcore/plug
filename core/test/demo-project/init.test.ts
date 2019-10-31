/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { join } from 'path';
import { TestClass, Test } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { PorjectInitialization } from '../../src/project-init/project-init.util';

@TestClass()
export class InitTest extends PlugTest {

	private readonly initTestFolder = join(__dirname, '..', '..', '..', 'test', 'demo-project');

	@Test()
	public async startApp() {

		// PorjectInitialization.start(this.initTestFolder);

	}

}
