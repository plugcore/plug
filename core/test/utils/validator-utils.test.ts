/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ValidatorUtils } from '../../src/utils/validator.utils';

@TestClass()
export class ValidatorUtilsTest extends PlugTest {


	@Test()
	public isDefined() {
		this.assert.ok(ValidatorUtils.isDefined(1));
		this.assert.ok(ValidatorUtils.isDefined(false));
		this.assert.ok(ValidatorUtils.isDefined('1'));
		this.assert.ok(ValidatorUtils.isDefined({}));
		this.assert.ok(!ValidatorUtils.isDefined(null));
		this.assert.ok(!ValidatorUtils.isDefined(undefined));
		this.assert.ok(!ValidatorUtils.isDefined(''));
		this.assert.ok(!ValidatorUtils.isDefined('       '));
	}

	@Test()
	public deepEqual() {
		this.assert.ok(ValidatorUtils.deepEqual(<any>undefined, <any>undefined));
		this.assert.ok(!ValidatorUtils.deepEqual({}, <any>undefined));
		this.assert.ok(!ValidatorUtils.deepEqual(<any>undefined, {}));
		this.assert.ok(!ValidatorUtils.deepEqual({a: 1}, {a: 1, b: 2}));
		this.assert.ok(!ValidatorUtils.deepEqual({a: 1}, {a: 2}));
		this.assert.ok(ValidatorUtils.deepEqual({}, {}));
		this.assert.ok(ValidatorUtils.deepEqual({a: 1}, {a: 1}));
		this.assert.ok(ValidatorUtils.deepEqual({a: {b:2}}, {a: {b:2}}));
		this.assert.ok(ValidatorUtils.deepEqual({a: {b:[1]}}, {a: {b:[1]}}));
		this.assert.ok(!ValidatorUtils.deepEqual({a: {b:[1]}}, {a: {b:[1, 2]}}));
	}

	@Test()
	public equal() {
		this.assert.ok(!ValidatorUtils.equal({a: 1}, {a: 1}));
		this.assert.ok(ValidatorUtils.equal(false, false));
		this.assert.ok(ValidatorUtils.equal(1, 1));
		this.assert.ok(ValidatorUtils.equal('0', '0'));
	}
}
