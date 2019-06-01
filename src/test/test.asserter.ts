import { deepStrictEqual, doesNotReject, doesNotThrow, notDeepStrictEqual, notStrictEqual, ok, rejects, strictEqual, throws } from 'assert';
import { ConsoleColors } from '../logs/log.enums';
import { JsStackUtils } from '../utils/js-stack.utils';
import { TestManager } from './test.manager';
import { ITestClass } from './test.shared';

export class Asserter {

	constructor(
		private testClass: ITestClass
	) { }

	//
	// Assert methods
	// All of them are wrappers for https://nodejs.org/api/assert.html
	// Always use strict mode
	//

	/**
	 * Tests for deep equality between the actual and expected parameters.
	 */
	public deepEqual(actual: any, expected: any) {
		this.controledExec(() => {
			deepStrictEqual(actual, expected);
		});
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned
	 * promise to complete. It will then check that the promise is not rejected.
	 */
	public async doesNotReject(func: Promise<any> | (() => Promise<any>)) {
		this.controledAsyncExec(async () => {
			await doesNotReject(func);
		});
	}

	/**
	 * Asserts that the function fn does not throw an error.
	 */
	public doesNotThrow(func: () => any) {
		this.controledExec(() => {
			doesNotThrow(func);
		});
	}

	/**
	 * Tests for deep strict inequality. Opposite of `assert.deepEqual()`
	 */
	public notDeepEqual(actual: any, expected: any) {
		this.controledExec(() => {
			notDeepStrictEqual(actual, expected);
		});
	}

	/**
	 * Tests strict inequality between the actual and expected parameters as determined by the `SameValue Comparison`.
	 */
	public notEqual(actual: any, expected: any) {
		this.controledExec(() => {
			notStrictEqual(actual, expected);
		});
	}

	/**
	 * Tests if value is truthy. It is equivalent to `assert.equal(!value, true)`
	 */
	public ok(val?: any) {
		this.controledExec(() => {
			ok(val);
		});
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the
	 * returned promise to complete. It will then check that the promise is rejected.
	 */
	public rejects(func: Promise<any> | (() => Promise<any>)) {
		this.controledAsyncExec(async () => {
			await rejects(func);
		});
	}

	/**
	 * Tests strict equality between the actual and expected parameters as determined by the `SameValue Comparison`.
	 */
	public equal(actual: any, expected: any) {
		this.controledExec(() => {
			strictEqual(actual, expected);
		});
	}

	/**
	 * Expects the function fn to throw an error.
	 */
	public throws(func: () => any) {
		this.controledExec(() => {
			throws(func);
		});
	}

	//
	// Private methods
	//

	private controledExec(fn: () => void) {
		const methodAndClass = this.getMethodAndClass();
		try {
			fn();
			if (methodAndClass) {
				TestManager.assertSuccessOnTest(methodAndClass.className, methodAndClass.methodName);
			}
		} catch (error) {
			let errorMsg: string;
			if (methodAndClass) {
				TestManager.assertErrorOnTest(methodAndClass.className, methodAndClass.methodName);
				errorMsg = `Assert error on ${this.testClass.name}: ${methodAndClass.methodName}`;
			} else {
				TestManager.unexpectedAssertErrorOnTestClass(this.testClass.name);
				errorMsg = `Unexpected error on ${this.testClass.name}`;
			}
			console.log(`${ConsoleColors.fgMagenta}${errorMsg}`);
			console.log(`${ConsoleColors.fgRed}${error.stack || (new Error()).stack}`, ConsoleColors.reset);
		}
	}

	private async controledAsyncExec(fn: () => Promise<void>) {
		const methodAndClass = this.getMethodAndClass();
		try {
			await fn();
			if (methodAndClass) {
				TestManager.assertSuccessOnTest(methodAndClass.className, methodAndClass.methodName);
			}
		} catch (error) {
			let errorMsg: string;
			if (methodAndClass) {
				TestManager.assertErrorOnTest(methodAndClass.className, methodAndClass.methodName);
				errorMsg = `Assert error on ${this.testClass.name}: ${methodAndClass.methodName}`;
			} else {
				TestManager.unexpectedAssertErrorOnTestClass(this.testClass.name);
				errorMsg = `Unexpected error on ${this.testClass.name}`;
			}
			console.log(`${ConsoleColors.fgMagenta}${errorMsg}`);
			console.log(`${ConsoleColors.fgRed}${error.stack || (new Error()).stack}`, ConsoleColors.reset);
		}
	}

	private getMethodAndClass() {
		const stack = JsStackUtils.getStack();
		for (const stackEl of stack) {
			const className = stackEl.getTypeName();
			const methodName = stackEl.getMethodName();
			const testMethod = this.testClass.testMethods.find(tm => tm.methodName === methodName);
			if (methodName && this.testClass.name === className && testMethod) {
				return { className, methodName };
				break;
			}
		}
	}

}
