/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { TestClass, PlugTest, Test } from '@plugdata/core';
import { RoutesUtils } from '../../src/routes/routes.utils';
import { ControllerExample } from './examples/controller.example';

@TestClass()
export class RoutesUtilsTest extends PlugTest {

	@Test()
	public getAllControllers() {

		const controllers = RoutesUtils.getAllControllers();
		this.assert.ok(controllers.find(c => c.controller === ControllerExample));

	}

	@Test()
	public getRegisteredMethods() {

		const methods = RoutesUtils.getRegisteredMethods(ControllerExample);
		this.assert.ok(methods.find(m => m.methodName === 'getTest' && m.httpMethod === 'GET'));
		this.assert.ok(methods.find(m => m.methodName === 'headTest' && m.httpMethod === 'HEAD'));
		this.assert.ok(methods.find(m => m.methodName === 'postTest' && m.httpMethod === 'POST'));
		this.assert.ok(methods.find(m => m.methodName === 'putTest' && m.httpMethod === 'PUT'));
		this.assert.ok(methods.find(m => m.methodName === 'deleteTest' && m.httpMethod === 'DELETE'));
		this.assert.ok(methods.find(m => m.methodName === 'optionsTest' && m.httpMethod === 'OPTIONS'));
		this.assert.ok(methods.find(m => m.methodName === 'patchTest' && m.httpMethod === 'PATCH'));

	}

}
