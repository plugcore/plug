
import { AfterTests, BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';

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
