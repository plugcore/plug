import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di10Example } from './di10.example';

@Service()
export class Di11Example {

	public timesConstructorCalled = 0;

	@Inject({ variation: { variationVar: '1' } }) private d10example1: Di10Example;

	constructor(
		@Inject({ variation: { variationVar: '2' } }) private d10example2: Di10Example
	) {
		this.timesConstructorCalled++;
	}

	public getD10example1() {
		return this.d10example1;
	}
	public getD10example2() {
		return this.d10example2;
	}

}
