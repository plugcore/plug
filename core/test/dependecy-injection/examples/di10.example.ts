import { Di3Example } from './di3.example';
import { Di1Example } from './di1.example';
import { Inject } from '../../../src/dependecy-injection/di.decorators';

export class Di10Example {

	public timesConstructorCalled = 0;

	constructor(
		private example3: Di3Example,
		private example1: Di1Example,
		@Inject({ variationVarName: 'variationVar' }) private variationVar: string
	) {
		this.timesConstructorCalled++;
	}

	public getExample3() {
		return this.example3;
	}
	public getExample1() {
		return this.example1;
	}
	public getVariationVar() {
		return this.variationVar;
	}

}
