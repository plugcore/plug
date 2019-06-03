import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { JsStackUtils } from '../../src/utils/js-stack.utils';

@TestClass({ testThisOnly: true })
export class JsStackUtilsTest extends PlugTest {

	@Test()
	private getLastCallFromStack() {
	}

	@Test()
	private getStack() {
		const stack = this.stackLvl1();
		this.assert.ok(Array.isArray(stack), { stopOnError: true });
		this.assert.ok(stack.length > 4, { stopOnError: true });
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

}
