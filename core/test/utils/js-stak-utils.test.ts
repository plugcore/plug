/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { JsStackUtils } from '../../src/utils/js-stack.utils';

@TestClass()
export class JsStackUtilsTest extends PlugTest {

	@Test()
	public getLastCallFromStack() {
		const lastCall0 = this.lastCallstackLvl1(0);
		const lastCall1 = this.lastCallstackLvl1(1);
		const lastCall2 = this.lastCallstackLvl1(2);
		const lastCall3 = this.lastCallstackLvl1(3);
		this.assert.ok(lastCall0 === lastCall1);
		this.assert.ok(lastCall1 === lastCall2);
		this.assert.ok(lastCall2 === lastCall0);
		this.assert.ok(lastCall0 !== lastCall3);
		this.assert.ok(lastCall1 !== lastCall3);
		this.assert.ok(lastCall2 !== lastCall3);
		this.assert.ok(JsStackUtils.getLastCallFromStack() !== JsStackUtils.getLastCallFromStack(-1));
	}

	@Test()
	public getStack() {
		const stack = this.stackLvl1();
		this.assert.ok(Array.isArray(stack), { stopOnError: true });
		this.assert.ok(stack.length > 5, { stopOnError: true });
	}

	private stackLvl1() {
		return this.stackLvl2();
	}

	private stackLvl2() {
		return this.stackLvl3();
	}

	private stackLvl3() {
		return JsStackUtils.getStack();
	}

	private lastCallstackLvl1(depth: number) {
		return this.lastCallstackLvl2(depth);
	}

	private lastCallstackLvl2(depth: number) {
		return this.lastCallstackLvl3(depth);
	}

	private lastCallstackLvl3(depth: number) {
		return JsStackUtils.getLastCallFromStack(depth);
	}

}
