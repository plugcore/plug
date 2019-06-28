import { Service } from '../../../src/dependecy-injection/di.decorators';
import { IDiOnInit } from '../../../src/dependecy-injection/di.interfaces';

@Service({ ctx: 'exampleCtx' })
export class Di7Example implements IDiOnInit {
	public timesOnInitCalled = 0;
	public async onInit() {
		this.timesOnInitCalled++;
	}
}
