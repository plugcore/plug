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
		const eventDispatcher = await Container.get(EventDispatcher);
		const eventsExample = await Container.get(EventsExample);

		const waitForEventToExecute = new Promise((resolve) => {
			eventsExample.readyFunc = resolve;
		});
		eventDispatcher.emmit(testEventName, examplePayload);

		await waitForEventToExecute;

		this.assert.deepEqual(examplePayload, eventsExample.payload);

	}

}
