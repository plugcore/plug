import { Service } from '../dependecy-injection/di.decorators';
import { FsUtils } from '../io/fs.utils';
import { JsStackUtils } from '../utils/js-stack.utils';
import { StringUtils } from '../utils/string.utils';
import { TypeChecker } from '../utils/type.checker';
import { ConsoleColors, LogLevels } from './log.enums';
import { LogQueueEntry } from './log.interefaces';

export type inMsg = (string | object)[];

/**
 * Class designed to be injected if other beans to handle all the log levels
 */
@Service()
export class Logger {

	private queueIsProcessing = false;
	private queue: LogQueueEntry[] = [];
	private readonly fileDescriptors: Record<string/* File path */, number/* File descriptor */> = {};

	constructor(
		private logFilePath?: string
	) { }

	public debug(...inMsgs: inMsg) {
		this.processMsg(LogLevels.debug, inMsgs);
	}

	public info(...inMsgs: inMsg) {
		this.processMsg(LogLevels.info, inMsgs);
	}

	public warn(...inMsgs: inMsg) {
		this.processMsg(LogLevels.warn, inMsgs);
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

		if (this.logFilePath) {
			this.writeLog(lvl, inMsgs, this.logFilePath);
		}
	}

	private showLog(lvl: LogLevels, result: string): void {

		let cColor: string;
		if (lvl === LogLevels.debug) {
			cColor = ConsoleColors.fgCyan;
		} else if (lvl === LogLevels.info) {
			cColor = ConsoleColors.fgGreen;
		} else if (lvl === LogLevels.warn) {
			cColor = ConsoleColors.fgYellow;
		} else if (lvl === LogLevels.error) {
			cColor = ConsoleColors.fgRed;
		} else {
			cColor = ConsoleColors.fgRed;
		}

		console.log(`${cColor}${lvl}:\t${result}${ConsoleColors.reset}`);
	}

	private writeLog(lvl: LogLevels, inMsgs: inMsg, filePath: string): void {

		const caller: string = JsStackUtils.getLastCallFromStack(2);
		const callerFormatted: string = caller.substring(caller.indexOf('plugcms'));

		const logs = inMsgs.map(msg => (<LogQueueEntry>{
			entry: {
				message: JSON.stringify(TypeChecker.isError(msg) ? msg.stack || '' : msg),
				level: lvl,
				timestamp: new Date().getTime(),
				clazz: callerFormatted
			},
			filePath
		}));

		logs.forEach(log => { this.queueLog(log); });

	}

	private queueLog(log: LogQueueEntry): void {

		this.queue.push(log);

		if (this.queue.length === 1 && !this.queueIsProcessing) {
			this.queueIsProcessing = true;
			this.processLog();
		}
	}

	private async processLog(): Promise<any> {

		await this.saveLogJson(this.queue[0]);

		this.queue.shift();

		if (this.queue.length !== 0) {
			this.processLog();
		} else {
			this.queueIsProcessing = false;
		}
	}

	// TODO Improve readibility
	private async saveLogJson(log: LogQueueEntry) {

		const filePath = log.filePath;
		const logString = JSON.stringify(log.entry) + '\n]';

		let fileDescriptor = this.fileDescriptors[filePath];
		if (!fileDescriptor) {
			fileDescriptor = await FsUtils.openLogFile(filePath);
			this.fileDescriptors[filePath] = fileDescriptor;
		}
		const logFileStats = await FsUtils.getStats(filePath);
		if (logFileStats.size === 0) {
			await FsUtils.writeToFile(fileDescriptor, '[\n' + logString, 0);
		} else {
			await FsUtils.writeToFile(fileDescriptor, ',' + logString, logFileStats.size - 1);
		}

	}

}
