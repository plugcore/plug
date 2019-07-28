import { EventUtils } from './event.utils';

export function OnEvent(event: string) {
	return function (clazz: any, methodName: string) {
		// If arguments size is 3 it means its a method definition
		if (arguments.length === 3) {
			EventUtils.registerEventListener(clazz, methodName, event);
		}
	};
}
