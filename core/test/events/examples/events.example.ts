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
