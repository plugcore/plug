import { Test, TestService } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { JsStackUtils } from '../../src/utils/js-stack.utils';

@TestService()
export class JsStackUtilsTest extends AsserterService {

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
