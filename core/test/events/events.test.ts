/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Container } from '../../src/dependecy-injection/di.container';
import { EventDispatcher } from '../../src/events/event.dispatcher';
import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { EventsExample, testEventName } from './examples/events.example';

@TestClass()
export class EventsTest extends PlugTest {

	@Test()
	public async executeEvent() {

		const examplePayload = { a: 1, b: '2' };
		const eventDispatcher = await Container.get<EventDispatcher>(EventDispatcher);
		const eventsExample = await Container.get<EventsExample>(EventsExample);

		const waitForEventToExecute = new Promise((resolve) => {
			eventsExample.readyFunc = resolve;
		});
		eventDispatcher.emmit(testEventName, examplePayload);

		await waitForEventToExecute;
		this.assert.deepEqual(examplePayload, eventsExample.payload);

	}

}
