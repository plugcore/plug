import { Service } from '../../../src/dependecy-injection/di.decorators';
import { IDiOnInit } from '../../../src/dependecy-injection/di.interfaces';

@Service()
export class Di2Example implements IDiOnInit {
	public testNumber = 10;
	public timesOnInitCalled = 0;
	public async onInit() {
		this.timesOnInitCalled++;
	}
}
