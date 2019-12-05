import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di12Example } from './di12.example';
import { Di13Example } from './di13.example';

@Service({ connection: 'testConnection' })
export class Di14Example {

	public timesConstructorCalled = 0;

	@Inject()
	private di12Example: Di12Example;

	constructor(
		private di13Example: Di13Example
	) {
		this.timesConstructorCalled++;
	}

	public getDi12Example() {
		return this.di12Example;
	}

	public getDi13Example() {
		return this.di13Example;
	}

}
