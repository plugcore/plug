import { Test, TestClass } from '../../src/test/test.decorators';

@TestClass()
export class LoggerTest {

	@Test()
	public async log() {
	}

}
