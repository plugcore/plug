import { Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.shared';

@Service()
export class Di2Example implements OnInit {
	public testNumber = 10;
	public timesOnInitCalled = 0;
	public async onInit() {
		this.timesOnInitCalled++;
	}
}
