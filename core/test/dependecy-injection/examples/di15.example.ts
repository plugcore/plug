import { Inject, InjectConnection, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di15Example {

	@InjectConnection()
	private connection?: string;

	constructor(
		@Inject('stringExample') private stringExample: string
	) {
	}

	public getConnection() {
		return this.connection;
	}


	public getStringExample() {
		return this.stringExample;
	}

}
