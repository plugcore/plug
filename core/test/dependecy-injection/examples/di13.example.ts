import { InjectConnection, Service } from '../../../src/dependecy-injection/di.decorators';

@Service()
export class Di13Example {

	public timesConstructorCalled = 0;

	@InjectConnection()
	private connection: string;

	constructor(
	) {
		this.timesConstructorCalled++;
	}

	public getConnection() {
		return this.connection;
	}

}
