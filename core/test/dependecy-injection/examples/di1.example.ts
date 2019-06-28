
import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { IDiOnInit } from '../../../src/dependecy-injection/di.interfaces';
import { Di2Example } from './di2.example';

@Service()
export class Di1Example implements IDiOnInit {

	@Inject()
	private example2: Di2Example;
	public timesOnInitCalled = 0;

	public getExample2() {
		return this.example2;
	}

	public async onInit() {
		this.timesOnInitCalled++;
	}

	public async asyncLoad() {
		await new Promise<Boolean>((callBack) => {
			setTimeout(() => { callBack(true); }, 500);
		});
	}
}
