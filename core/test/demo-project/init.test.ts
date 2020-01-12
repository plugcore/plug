import { join } from 'path';
import { Test, TestService } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';

@TestService()
export class InitTest extends AsserterService {

	private readonly initTestFolder = join(__dirname, '..', '..', '..', 'test', 'demo-project');

	@Test()
	public async startApp() {

		// PorjectInitialization.start(this.initTestFolder);

	}

}
