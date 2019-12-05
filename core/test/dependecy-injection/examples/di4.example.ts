
import { Service } from '../../../src/dependecy-injection/di.decorators';
import { OnInit } from '../../../src/dependecy-injection/di.interfaces';
import { Di1Example } from './di1.example';
import { Di3Example } from './di3.example';

@Service()
export class Di4Example implements OnInit {

	public timesConstructorCalled = 0;

	constructor(
		private example3: Di3Example,
		private example1: Di1Example
	) {
		this.timesConstructorCalled++;
	}

	public async onInit(): Promise<void> {
		await new Promise((resolve) => {
			setTimeout(() => { resolve(); }, 500);
		});
	}

	public getExample3() {
		return this.example3;
	}
	public getExample1() {
		return this.example1;
	}

}
