
import { AfterTests, BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';

@TestClass()
export class TypeCheckerTest extends PlugTest {

	@BeforeTests()
	public async beforeTests() {
		console.log("BEFORE TESTS");
	}

	@AfterTests()
	public async afterTests() {
		console.log("AFTER TESTS");
	}

	@Test()
	public async test1() {
		this.assert.ok(1);
	}

	@Test()
	public async test2() {
		this.assert.ok(1);
	}

}
