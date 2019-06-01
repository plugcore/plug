
import { PlugTest } from '../../src/test/test.assert';
import { Test, TestClass } from '../../src/test/test.decorators';

@TestClass()
export class TypeCheckerTest extends PlugTest {

	@Test()
	public async test1() {
		this.assert.ok(1);
	}

	@Test()
	public async test2() {
		this.assert.ok(1);
	}

}
