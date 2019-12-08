import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di15Example } from './di15.example';
import { Di16Example } from './di16.example';
import { Di17Example } from './di17.example';

@Service()
export class Di18Example {

	@Inject()
	private di15Example: Di15Example;

	constructor(
		@Inject() private di16Example: Di16Example,
		@Inject() private di17Example: Di17Example
	) {
	}

	public getDi15Example() {
		return this.di15Example;
	}

	public getDi16Example() {
		return this.di16Example;
	}

	public getDi17Example() {
		return this.di17Example;
	}

}
