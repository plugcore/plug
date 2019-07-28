import { join } from 'path';
import { PorjectInitialization } from '../../src/init';
import { TestClass, Test } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';

@TestClass()
export class InitTest extends PlugTest {

	private readonly initTestFolder = join(__dirname, '..', '..', '..', 'test', 'demo-project');

	@Test({ testThisOnly: true })
	public async startApp() {

		PorjectInitialization.start(this.initTestFolder);

	}

}
