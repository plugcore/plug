import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';
import { IDiEntry } from '../dependecy-injection/di.shared';
import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';
import { IRegisteredEvent } from './event.shared';
import { Container } from '../dependecy-injection/di.container';

export const globalEventEmitter: EventEmitterType = new EventEmitter();

export class EventUtils {

	public static readonly propertyMetadataPrefix = 'p-event-listener:';

	public static onServiceReady(entry: IDiEntry) {
		if (entry.object && entry.serviceClass) {
			const regsiteredEvents = this.getRegisteredEvents(entry.serviceClass);
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

// Bind 'onServiceReady' to the container so each time a new service is
// set as ready, this function will be called
Container.onServiceReady(EventUtils.onServiceReady.bind(EventUtils));
