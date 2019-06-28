
import { Container } from '../../../src/dependecy-injection/di.container';
import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di1Example } from './di1.example';
import { Di8Example } from './di8.example.ctx';

@Service({ ctx: 'exampleCtx' })
export class Di9Example {

	public timesConstructorCalled = 0;
	constructor(
		public di8Example: Di8Example,
		@Inject({ctx: Container.globalCtx}) public di1Example: Di1Example
	) {
		this.timesConstructorCalled++;
	}

}
