import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { Di20Example } from './di20.example';

@Service({ connection: 'testConnection' })
export class Di21Example {

	constructor(
		@Inject({ variation: { varProp: 'varProp', varConstructor: 'varConstructor' } })
		private di20Example1: Di20Example,
		@Inject({ variation: { varConstructor: 'varConstructor' } })
		private di20Example2: Di20Example,
		@Inject({ variation: { varProp: 'varProp' } })
		private di20Example3: Di20Example,
		@Inject()
		private di20Example4: Di20Example
	) {
	}

	public getDi20Example1() {
		return this.di20Example1;
	}

	public getDi20Example2() {
		return this.di20Example2;
	}

	public getDi20Example3() {
		return this.di20Example3;
	}

	public getDi20Example4() {
		return this.di20Example4;
	}

}
