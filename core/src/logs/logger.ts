import * as pino from 'pino';
import { InjectConfiguration } from '../configuration/configuration.decorators';
import { Configuration } from '../configuration/configuration.interfaces';
import { Inject, InjectConnection, Service } from '../dependecy-injection/di.decorators';
import { ObjectUtils } from '../utils/object.utils';

/**
 * Class designed to be injected if other services in order to handle all the log levels
 */
@Service()
export class Logger {

	private pinoLogger: pino.Logger;
	public pinoOptions: pino.LoggerOptions;

	constructor(
		@InjectConfiguration() private projectConfiguration: Configuration,
		@Inject({ variationVarName: 'name' }) private logName?: string,
		@InjectConnection() private connection?: string
	) {
		this.pinoOptions = Object.assign(
			ObjectUtils.deepClone(this.projectConfiguration.log),
			<pino.LoggerOptions>{
				name: this.logName ? this.logName :
				this.connection ? `connection:${this.connection}` :
				'main'
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
