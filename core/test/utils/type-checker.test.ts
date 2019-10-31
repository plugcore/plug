/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { TypeChecker } from '../../src/utils/type.checker';

@TestClass()
export class TypeCheckerTest extends PlugTest {

	@Test()
	public isString() {
		this.assert.ok(!TypeChecker.isString(1));
		this.assert.ok(TypeChecker.isString('1'));
		this.assert.ok(!TypeChecker.isString(undefined));
		this.assert.ok(!TypeChecker.isString(null));
		this.assert.ok(!TypeChecker.isString(false));
		this.assert.ok(!TypeChecker.isString(true));
		this.assert.ok(!TypeChecker.isString({}));
		this.assert.ok(!TypeChecker.isString({ a: 1 }));
		this.assert.ok(!TypeChecker.isString([]));
		this.assert.ok(!TypeChecker.isString([1, { b: 2 }]));
		this.assert.ok(TypeChecker.isString(''));
		this.assert.ok(TypeChecker.isString('test'));
	}

	@Test()
	public isNumber() {
		this.assert.ok(TypeChecker.isNumber(1));
		this.assert.ok(!TypeChecker.isNumber('1'));
		this.assert.ok(!TypeChecker.isNumber(undefined));
		this.assert.ok(!TypeChecker.isNumber(null));
		this.assert.ok(!TypeChecker.isNumber(false));
		this.assert.ok(!TypeChecker.isNumber(true));
		this.assert.ok(!TypeChecker.isNumber({}));
		this.assert.ok(!TypeChecker.isNumber({ a: 1 }));
		this.assert.ok(!TypeChecker.isNumber([]));
		this.assert.ok(!TypeChecker.isNumber([1, { b: 2 }]));
		this.assert.ok(!TypeChecker.isNumber(''));
		this.assert.ok(!TypeChecker.isNumber('test'));
	}

	@Test()
	public isBoolean() {
		this.assert.ok(!TypeChecker.isBoolean(1));
		this.assert.ok(!TypeChecker.isBoolean('1'));
		this.assert.ok(!TypeChecker.isBoolean(undefined));
		this.assert.ok(!TypeChecker.isBoolean(null));
		this.assert.ok(TypeChecker.isBoolean(false));
		this.assert.ok(TypeChecker.isBoolean(true));
		this.assert.ok(!TypeChecker.isBoolean({}));
		this.assert.ok(!TypeChecker.isBoolean({ a: 1 }));
		this.assert.ok(!TypeChecker.isBoolean([]));
		this.assert.ok(!TypeChecker.isBoolean([1, { b: 2 }]));
		this.assert.ok(!TypeChecker.isBoolean(''));
		this.assert.ok(!TypeChecker.isBoolean('test'));
	}

	@Test()
	public isObject() {
		this.assert.ok(!TypeChecker.isObject(1));
		this.assert.ok(!TypeChecker.isObject('1'));
		this.assert.ok(!TypeChecker.isObject(undefined));
		this.assert.ok(!TypeChecker.isObject(null));
		this.assert.ok(!TypeChecker.isObject(false));
		this.assert.ok(!TypeChecker.isObject(true));
		this.assert.ok(TypeChecker.isObject({}));
		this.assert.ok(TypeChecker.isObject({ a: 1 }));
		this.assert.ok(!TypeChecker.isObject([]));
		this.assert.ok(!TypeChecker.isObject([1, { b: 2 }]));
		this.assert.ok(!TypeChecker.isObject(''));
		this.assert.ok(!TypeChecker.isObject('test'));
	}

	@Test()
	public isArray() {
		this.assert.ok(!TypeChecker.isArray(1));
		this.assert.ok(!TypeChecker.isArray('1'));
		this.assert.ok(!TypeChecker.isArray(undefined));
		this.assert.ok(!TypeChecker.isArray(null));
		this.assert.ok(!TypeChecker.isArray(false));
		this.assert.ok(!TypeChecker.isArray(true));
		this.assert.ok(!TypeChecker.isArray({}));
		this.assert.ok(!TypeChecker.isArray({ a: 1 }));
		this.assert.ok(TypeChecker.isArray([]));
		this.assert.ok(TypeChecker.isArray([1, { b: 2 }]));
		this.assert.ok(!TypeChecker.isArray(''));
		this.assert.ok(!TypeChecker.isArray('test'));
	}

	//
	// Reflect metadata used types
	//

	@Test()
	public typeIsString() {
		this.assert.ok(TypeChecker.typeIsString(String));
		this.assert.ok(!TypeChecker.typeIsNumber(String));
		this.assert.ok(!TypeChecker.typeIsBoolean(String));
	}

	@Test()
	public typeIsNumber() {
		this.assert.ok(!TypeChecker.typeIsString(Number));
		this.assert.ok(TypeChecker.typeIsNumber(Number));
		this.assert.ok(!TypeChecker.typeIsBoolean(Number));
	}

	@Test()
	public typeIsBoolean() {
		this.assert.ok(!TypeChecker.typeIsString(Boolean));
		this.assert.ok(!TypeChecker.typeIsNumber(Boolean));
		this.assert.ok(TypeChecker.typeIsBoolean(Boolean));
	}

}
