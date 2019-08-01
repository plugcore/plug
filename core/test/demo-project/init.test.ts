import { join } from 'path';
import { TestClass, Test } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { PorjectInitialization } from '../../src/project-init/project-init.util';

@TestClass()
export class InitTest extends PlugTest {

	private readonly initTestFolder = join(__dirname, '..', '..', '..', 'test', 'demo-project');

	@Test()
	public async startApp() {

		PorjectInitialization.start(this.initTestFolder);

	}

}
