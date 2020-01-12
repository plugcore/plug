import { Test, TestService } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { TestLogConnectionService } from './testlog.connection.service';
import { TestLogService } from './testlog.service';

@TestService()
export class LoggerTest extends AsserterService {

	constructor(
		private testLogService: TestLogService,
		private testLogConnectionService: TestLogConnectionService
	) {
		super();
	}

	@Test()
	public async log() {
		this.testLogService.outputLogs();
		this.testLogConnectionService.outputLogs();
		this.assert.ok(true);
	}

}
