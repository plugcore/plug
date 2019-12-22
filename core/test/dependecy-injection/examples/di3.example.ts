import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.shared';
import { Di1Example } from './di1.example';
import { Di2Example } from './di2.example';

@Service()
export class Di3Example implements OnInit {
	public testNumber = 18;

	@Inject()
	private example2: Di2Example;
	@Inject()
	private example1: Di1Example;
	public timesOnInitCalled = 0;

	public getExample2() {
		return this.example2;
	}
	public getExample1() {
		return this.example1;
	}

	public async onInit() {
		this.timesOnInitCalled++;
	}

}
