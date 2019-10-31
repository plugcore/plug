/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';
import { IDiEntry } from '../dependecy-injection/di.interfaces';
import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';
import { IRegisteredEvent } from './event.shared';

export const globalEventEmitter: EventEmitterType = new EventEmitter();

export class EventUtils {

	public static readonly propertyMetadataPrefix = 'p-event-listener:';

	public static onServiceReady(entry: IDiEntry) {
		if (entry.object && entry.serviceClass) {
			const regsiteredEvents = this.getRegisteredEvents(<ClassParameter<any>>entry.serviceClass);
			if (regsiteredEvents.length > 0) {
				for (const regsiteredEvent of regsiteredEvents) {
					globalEventEmitter.on(regsiteredEvent.event, entry.object[regsiteredEvent.methodName], entry.object);
				}
			}
		}
	}

	public static registerEventListener(clazz: ClassParameter<any>, methodName: string, event: string) {
		const regsiteredEvent: IRegisteredEvent = { methodName, event };
		Reflect.defineMetadata(`${this.propertyMetadataPrefix}${methodName}`, regsiteredEvent, clazz);
	}

	//
	// Private methods
	//

	public static getRegisteredEvents<T>(clazz: ClassParameter<T>): IRegisteredEvent[] {
		const keys = Reflect.getMetadataKeys(clazz.prototype);
		return keys
			.filter(metadataKey => TypeChecker.isString(metadataKey) && metadataKey.startsWith(this.propertyMetadataPrefix))
			.map(metadataKey => Reflect.getMetadata(metadataKey, clazz.prototype));
	}

}
