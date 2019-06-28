import { join } from 'path';
import { Logger } from '../../src/logs/logger';
import { Test, TestClass } from '../../src/test/test.decorators';

@TestClass({testThisOnly: true})
export class LoggerTest {

	private readonly testObj = {
		a: 1,
		b: '2',
		c: false,
		d: { a: 1 },
		e: [1, '2']
	};

	@Test()
	public async log() {
		// TODO: Make the logger to be able to output somewhere else
		// than the console when printing so we can test properly
		/*
		const filePath = join(__dirname, 'log.json');
		const logger = new Logger(filePath);
		logger.debug('debug test 1 param');
		logger.debug('debug test 2 param with ojb', this.testObj);

		logger.info('info test 1 param');
		logger.info('info test 2 param with ojb', this.testObj);

		logger.warn('warn test 1 param');
		logger.warn('warn test 2 param with ojb', this.testObj);

		logger.error('error test 1 param', new Error('test'));
		logger.error('error test 2 param with ojb', this.testObj);

		logger.fatal('fatal test 1 param');
		logger.fatal('fatal test 2 param with ojb', this.testObj);
 		*/
	}

}
