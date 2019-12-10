import { Inject, InjectConnection, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di20Example {

	@Inject({ variationVarName: 'varProp' })
	private varProp: string;

	constructor(
		@Inject({ variationVarName: 'varConstructor' }) private varConstructor: string,
		@InjectConnection() private varConstructorConnection: string
	) {
	}

	public getVarProp() {
		return this.varProp;
	}
	public getVarConstructor() {
		return this.varConstructor;
	}
	public getVarConstructorConnection() {
		return this.varConstructorConnection;
	}

}
