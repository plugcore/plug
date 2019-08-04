import { ProjectConfiguration } from '../configuration/configuration.service';
import { Service } from '../dependecy-injection/di.decorators';
import * as pino from 'pino';
import { ObjectUtils } from '../utils/object.utils';

/**
 * Class designed to be injected if other beans to handle all the log levels
 */
@Service()
export class Logger {

	private pinoLogger: pino.Logger;
	public  pinoOptions: pino.LoggerOptions;

	constructor(
		private projectConfiguration: ProjectConfiguration
	) {
		this.pinoOptions = Object.assign(
			ObjectUtils.deepClone(this.projectConfiguration.log),
			<pino.LoggerOptions>{
				// TODO: Modify with extensions name in the future
				name: 'main'
			}
		);
		this.pinoLogger = pino(this.pinoOptions);
	}

	public debug(...inMsgs: any) {
		for (const msg of inMsgs) {
			this.pinoLogger.debug(msg);
		}
	}

	public info(...inMsgs: any) {
		for (const msg of inMsgs) {
			this.pinoLogger.info(msg);
		}
	}

	public warn(...inMsgs: any) {
		for (const msg of inMsgs) {
			this.pinoLogger.warn(msg);
		}
	}

	public error(...inMsgs: any) {
		for (const msg of inMsgs) {
			this.pinoLogger.error(msg);
		}
	}

	public fatal(...inMsgs: any) {
		for (const msg of inMsgs) {
			this.pinoLogger.fatal(msg);
		}
	}

}
