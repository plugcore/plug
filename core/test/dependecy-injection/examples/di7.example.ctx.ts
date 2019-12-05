import { Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.interfaces';

@Service({ ctx: 'exampleCtx' })
export class Di7Example implements OnInit {
	public timesOnInitCalled = 0;
	public async onInit() {
		this.timesOnInitCalled++;
	}
}
