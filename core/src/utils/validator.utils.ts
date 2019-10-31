/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { deepStrictEqual, strictEqual } from 'assert';
import { TypeChecker } from './type.checker';

export class ValidatorUtils {

	/**
	 * Determines that the param is not null nor undefined.
	 * If it's an string, then it also determines that the string is not empty
	 */
	public static isDefined(inp: any) {
		if (TypeChecker.isString(inp)) {
			return inp !== null && inp !== undefined && inp.trim().length > 0;
		} else {
			return inp !== null && inp !== undefined;
		}
	}

	/**
	 * Wrapper of Nodejs `assert.deepStrictEqual`, determines if both objects
	 * have the same properties an properties values
	 * @param obj1
	 * @param obj2
	 */
	public static deepEqual(obj1: Record<string, any>, obj2: Record<string, any>) {
		try {
			deepStrictEqual(obj1, obj2);
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Wrapper of Nodejs `assert.strictEqual`, determines if two variables are the same.
	 * If you wish to compare objects, use `ValidatorUtils.deepEqual`, this is ment to
	 * other variable types such as  strings, numbers, etc.
	 * @param inp1
	 * @param inp2
	 */
	public static equal(inp1: any, inp2: any) {
		try {
			strictEqual(inp1, inp2);
			return true;
		} catch (error) {
			return false;
		}
	}

}
