import { Inject, InjectConnection, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di16Example {

	@Inject('numberExample') private numberExample: number;

	constructor(
		@InjectConnection({ optional: true }) private connection?: string
	) {
	}

	public getConnection() {
		return this.connection;
	}

	public getNumberExample() {
		return this.numberExample;
	}

}
