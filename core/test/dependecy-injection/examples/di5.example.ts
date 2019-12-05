
import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.interfaces';
import { Di1Example } from './di1.example';
import { Di2Example } from './di2.example';
import { Di6Example } from './di6.example';

@Service()
export class Di5Example implements OnInit {

	public timesConstructorCalled = 0;
	public timesOnInitCalled = 0;

	@Inject()
	private example1: Di1Example;

	constructor(
		@Inject({ sId: 'service6' }) private example6: Di6Example,
		private example2: Di2Example
	) {
		this.timesConstructorCalled++;
	}

	public async onInit() {
		this.timesOnInitCalled++;
	}

	public getExample1() {
		return this.example1;
	}
	public getExample2() {
		return this.example2;
	}
	public getExample6() {
		return this.example6;
	}

}
