import { Container } from '../../src/dependecy-injection/di.container';
import { BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { TestLogService } from './testlog.service';
import { TestLogConnectionService } from './testlog.connection.service';

@TestClass()
export class LoggerTest extends PlugTest {

	public testLogService: TestLogService;
	public testLogConnectionService: TestLogConnectionService;

	@BeforeTests()
	public async beforeTests() {
		this.testLogService = await Container.get(TestLogService);
		this.testLogConnectionService = await Container.get(TestLogConnectionService);
	}

	@Test()
	public async log() {
		this.testLogService.outputLogs();
		this.testLogConnectionService.outputLogs();
		this.assert.ok(true);
	}

}
