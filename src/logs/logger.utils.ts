import { Service } from '../dependecy-injection/di.decorators';
import { JsStackUtils } from '../utils/js-stack.utils';
import { StringUtils } from '../utils/string.utils';
import { TypeChecker } from '../utils/type.checker';
import { ConsoleColors, LogLevels } from './log.enums';
import { LogEntry } from './log.interefaces';

export type inMsg = (string | object)[];

/**
 * Class designed to be injected if other beans to handle all the log levels
 */
@Service()
export class Logger {

	private queue: LogEntry[] = [];

	constructor(
		private logFilePath?: string
	) { }

	public debug(...inMsgs: inMsg) {
		this.processMsg(LogLevels.debug, inMsgs);
	}

	public info(...inMsgs: inMsg) {
		this.processMsg(LogLevels.info, inMsgs);
	}

	public warning(...inMsgs: inMsg) {
		this.processMsg(LogLevels.warning, inMsgs);
	}

	public error(...inMsgs: inMsg) {
		this.processMsg(LogLevels.error, inMsgs);
	}

	public fatal(...inMsgs: inMsg) {
		this.processMsg(LogLevels.fatal, inMsgs);
	}

	// ****

	private processMsg(lvl: LogLevels, inMsgs: inMsg) {

		let result = '';

		inMsgs.forEach(msg => {
			if (TypeChecker.isString(msg)) {
				result = `${result} ${msg}`;
			} else if (msg instanceof Object) {
				result = `${result} ${StringUtils.objToStr(msg)}`;
			}
		});

		this.showLog(lvl, result);

		this.prepareJson(lvl, result);
	}

	private showLog(lvl: LogLevels, result: string): void {

		let cColor: string;
		if (lvl === LogLevels.debug) {
			cColor = ConsoleColors.fgCyan;
		} else if (lvl === LogLevels.info) {
			cColor = ConsoleColors.fgGreen;
		} else if (lvl === LogLevels.warning) {
			cColor = ConsoleColors.fgYellow;
		} else if (lvl === LogLevels.error) {
			cColor = ConsoleColors.fgRed;
		} else {
			cColor = ConsoleColors.fgRed;
		}

		console.log(`${cColor}${lvl}:\t${result}${ConsoleColors.reset}`);
	}

	private prepareJson(lvl: LogLevels, result: string): void {

		const caller: string = JsStackUtils.getLastCallFromStack(2);
		const callerFormatted: string = caller.substring(caller.indexOf('plugcms'));

		const log = <LogEntry>{
			level: lvl,
			message: result,
			timestamp: new Date().getTime(),
			clazz: callerFormatted,
			ext: ''
		};

		this.queueLog(log);
	}

	private queueLog(log: LogEntry): void {

		this.queue.push(log);

		if (this.queue.length === 1) {

			this.processLog();
		}
	}

	private async processLog(): Promise<any> {

		await this.saveLogJson(this.queue[0]);

		this.queue.shift();

		if (this.queue.length !== 0) {
			this.processLog();
		}
	}

	private async saveLogJson(_: LogEntry) {
		/* 
		if (!this.isLogFile) {
			this.logFileDescriptor = await FsUtils.openLogFile(this.logFileName);
			this.isLogFile = true;
		}

		const logString = ',' + JSON.stringify(entry, null, 2) + ']';

		const logFileStats = await FsUtils.getStats(this.logFileName);

		await FsUtils.writeToFile(this.logFileDescriptor, logString, logFileStats.size - 1); */
	}

}
