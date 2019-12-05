import { Service, InjectConnection } from '../../../src/dependecy-injection/di.decorators';
import { Di1Example } from './di1.example';

@Service()
export class Di12Example {

	public timesConstructorCalled = 0;

	constructor(
		private di1Example: Di1Example,
		@InjectConnection() private connection: string
	) {
		this.timesConstructorCalled++;
	}

	public getDi1Example() {
		return this.di1Example;
	}
	public getConnection() {
		return this.connection;
	}

}
