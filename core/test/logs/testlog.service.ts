import { Service } from '../../src/dependecy-injection/di.decorators';
import { Logger } from '../../src/logs/logger';

@Service()
export class TestLogService {

	constructor(
		private mainLog: Logger
	) {}

	public outputLogs() {
		this.mainLog.fatal('Main log string');
		this.mainLog.info({ numProp: 3, stringProp: 'Main log object' });
	}

}
