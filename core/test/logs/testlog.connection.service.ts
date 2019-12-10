import { Service } from '../../src/dependecy-injection/di.decorators';
import { Logger } from '../../src/logs/logger';
import { InjectLogger } from '../../src/logs/log.decorators';

@Service({ connection: 'testConnection' })
export class TestLogConnectionService {

	constructor(
		private connectionLog: Logger,
		@InjectLogger('custom') private namedLog: Logger
	) {}

	public outputLogs() {
		this.connectionLog.debug('Test connection log string');
		this.connectionLog.info({ numProp: 1, stringProp: 'Test connection log object' });
		this.namedLog.warn('Test nammed log string');
		this.namedLog.error({ numProp: 2, stringProp: 'Test nammed log object' });
	}

}
