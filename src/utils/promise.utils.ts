
export class PromiseUtils {

	/**
	 * Executes a large list of promises in batch, but sinces functions that create promises
	 * are executen the moment you call them, yo can't just execute all of them at once, therefore
	 * you have to pass an array of elemnts and a function that will convert those elements into a promise
	 * to be executed
	 * @param sourceObjs Source objects
	 * @param funcPerObj Function to convert said object into a promise
	 * @param batchSize Number of promises to execute at the same time
	 */
	public static async execInBatch<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>, batchSize: number): Promise<(R | Error)[]> {

		const nIterations = Math.ceil(sourceObjs.length / batchSize);
		let results: (R | Error)[] = [];

		for (let index = 0; index < nIterations; index++) {
			const objsToProcess = sourceObjs.slice(batchSize * index, (batchSize * index) + batchSize);
			results = results.concat(await Promise.all(
				objsToProcess
					.map(funcPerObj)
					.map(p => p.catch(e => e))
					.map(p => p.then(e => typeof e === 'function' ? e() : e))
			));
		}

		return results;

	}

	/**
	 * Executes the function for each object in the array secuentially
	 * @param sourceObjs
	 * @param funcPerObj
	 */
	public static async execSecuentally<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>): Promise<R[]> {
		const results: R[] = [];
		for (const obj of sourceObjs) {
			results.concat(await funcPerObj(obj));
		}
		return results;
	}

	/**
	 * Waits for a promise to resolve x seconds, if it doesn't respond or it
	 * generates an error, the promise gets rejected
	 * @param promiseToExec
	 * @param secs
	 */
	public static timeOut<T>(promiseToExec: Promise<T>, secs: number): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const timeOut = setTimeout(() => {
				reject(`Timeout after waiting ${secs} seconds`);
			}, secs * 1000);
			promiseToExec.then(res => {
				clearTimeout(timeOut);
				resolve(res);
			}).catch(err => {
				clearTimeout(timeOut);
				reject(err);
			});
		});
	}

	/**
	 * Generates a promise that will wait what you pass to it
	 * @param milsToWait
	 */
	public static async wait(milsToWait: number) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, milsToWait);
		});
	}

}
