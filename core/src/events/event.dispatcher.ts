import { ListenerFn } from 'eventemitter3';
import { Service } from '../dependecy-injection/di.decorators';
import { Logger } from '../logs/logger';
import { globalEventEmitter } from './event.utils';

@Service()
export class EventDispatcher {

	constructor(
		private log: Logger
	) { }

	private readonly eventEmitter = globalEventEmitter;

	public on(event: string, func: ListenerFn<any[]>, context?: any) {
		this.eventEmitter.on(event, func, context);
	}

	public emmit(event: string, eventPayload: any) {
		this.log.debug('Emitting event ' + event);
		this.eventEmitter.emit(event, eventPayload);
	}

}
