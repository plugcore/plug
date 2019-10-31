/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { EventUtils } from './event.utils';

export function OnEvent(event: string) {
	return function (clazz: any, methodName: string) {
		// If arguments size is 3 it means its a method definition
		if (arguments.length === 3) {
			EventUtils.registerEventListener(clazz, methodName, event);
		}
	};
}
