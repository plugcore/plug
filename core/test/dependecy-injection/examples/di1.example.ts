
import { Inject, Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.shared';
import { Di2Example } from './di2.example';

@Service()
export class Di1Example implements OnInit {

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
		await new Promise<boolean>((callBack) => {
			setTimeout(() => { callBack(true); }, 500);
		});
	}
}
