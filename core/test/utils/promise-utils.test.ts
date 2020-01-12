import { Test, TestService } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { PromiseUtils } from '../../src/utils/promise.utils';

@TestService()
export class PromiseUtilsTest extends AsserterService {

	@Test()
	public async execInBatch() {
		const execData = [0, 1, 2, 3, 4, 5];
		const iterations: number[] = [];
		const start = Date.now();
		await PromiseUtils.execInBatch(execData, async (data: number) => {
			iterations.push(data);
			await PromiseUtils.wait(10);
		}, 2);
		this.assert.deepEqual(iterations, execData);
		this.assert.ok((Date.now() - start) >= 30);
	}

	@Test()
	public async execSecuentally() {
		const execData = [0, 1, 2, 3, 4, 5];
		const iterations: number[] = [];
		await PromiseUtils.execSecuentally(execData, async (data: number) => {
			iterations.push(data);
		});
		this.assert.deepEqual(iterations, execData);
	}

	@Test()
	public async timeOut() {
		await this.assert.rejects(
			PromiseUtils.timeOut(new Promise(resolve => {
				setTimeout(resolve, 150);
			}), 100)
		);
		await this.assert.doesNotReject(
			PromiseUtils.timeOut(new Promise(resolve => {
				setTimeout(resolve, 50);
			}), 100)
		);
	}

	@Test()
	public async wait() {
		const start = Date.now();
		await PromiseUtils.wait(50);
		this.assert.ok((Date.now() - start) >= 50);
	}

}
