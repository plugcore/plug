import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di15Example } from './di15.example';
import { Di16Example } from './di16.example';
import { Di17Example } from './di17.example';

@Service({ connection: 'testConnection' })
export class Di19Example {

	@Inject()
	private di15Example: Di15Example;

	@Inject({ variation: { optionalVariationString: 'stringtest1', optionalVariationNumber: 11 } })
	private di17Example1: Di17Example;

	constructor(
		private di16Example: Di16Example,
		@Inject({ variation: { optionalVariationString: 'stringtest2', optionalVariationNumber: 22 } })
		private di17Example2: Di17Example,
		@Inject({ variation: { optionalVariationString: 'stringtest3' } })
		private di17Example3: Di17Example,
		@Inject({ variation: { optionalVariationNumber: 44 } })
		private di17Example4: Di17Example
	) {
	}

	public getDi15Example() {
		return this.di15Example;
	}

	public getDi16Example() {
		return this.di16Example;
	}

	public getDi17Example1() {
		return this.di17Example1;
	}

	public getDi17Example2() {
		return this.di17Example2;
	}

	public getDi17Example3() {
		return this.di17Example3;
	}

	public getDi17Example4() {
		return this.di17Example4;
	}

}
