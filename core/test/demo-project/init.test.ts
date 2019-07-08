import { join } from 'path';
import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { PorjectInitialization } from '../../src/init';

@TestClass()
export class InitTest extends PlugTest {

	private readonly initTestFolder = join(__dirname, '..', '..', '..', 'test', 'demo-project');

	//@Test()
	public async startApp() {

		PorjectInitialization.start(this.initTestFolder);

	}

}
