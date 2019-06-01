import { ok } from 'assert';
import { ConsoleColors } from '../logs/log.enums';
import { JsStackUtils } from '../utils/js-stack.utils';
import { TestManager } from './test.manager';
import { ITestClass } from './test.shared';

export class PlugTest {
	protected assert: Asserter;
}

export class Asserter {

	constructor(
		private testClass: ITestClass
	) {}

	public ok(val?: any) {
		this.controledExec(() => {
			ok(val);
		});
	}

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
			console.log(`${ConsoleColors.fgRed}${error.stack || (new Error()).stack}`,ConsoleColors.reset);
		}
	}

	private getMethodAndClass() {
		const stack = JsStackUtils.getStack();
		for (const stackEl of stack) {
			const className = stackEl.getTypeName();
			const methodName = stackEl.getMethodName();
			const testMethod = this.testClass.testMethods.find(tm => tm.methodName === methodName);
			if (methodName && this.testClass.name === className && testMethod ) {
				return { className, methodName };
				break;
			}
		}
	}

}
