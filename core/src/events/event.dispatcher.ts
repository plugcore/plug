/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
		this.log.debug(`Registering event listener '${func.name}' to ${event}`);
		this.eventEmitter.on(event, func, context);
	}

	public emmit(event: string, eventPayload?: any) {
		this.log.debug('Emitting event ' + event);
		this.eventEmitter.emit(event, eventPayload);
	}

}
