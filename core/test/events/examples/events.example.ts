/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Service } from '../../../src/dependecy-injection/di.decorators';
import { OnEvent } from '../../../src/events/event.decorators';

export const testEventName = 'testEvent';

@Service()
export class EventsExample {

	public payload: any;
	public readyFunc: Function;

	@OnEvent(testEventName)
	public onTestEvent(payload: any) {
		this.payload = payload;
		this.readyFunc();
	}

}
