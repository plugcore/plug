import { Service } from '../../../src/dependecy-injection/di.decorators';
import { Di7Example } from './di7.example.ctx';

@Service({ ctx: 'exampleCtx' })
export class Di8Example {

	public timesConstructorCalled = 0;
	constructor(
		public di7Example: Di7Example
	) {
		this.timesConstructorCalled++;
	}

}
