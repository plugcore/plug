/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class JsStackUtils {

	public static getLastCallFromStack(depth?: number): string {
		return this.getCaller(depth ? depth + 3 : 3) || '';
	}

	// private
	private static getCaller(depth: number) {
		const stack = this.getStack();

		// Remove superfluous function calls on stack
		for (let index = 0; index < depth; index++) {
			stack.shift();
		}

		// Return caller's caller
		return stack[1].getFileName() || undefined;
	}

	public static getStack() {

		// Save original Error.prepareStackTrace
		const origPrepareStackTrace = Error.prepareStackTrace;

		// Override with function that just returns `stack`
		Error.prepareStackTrace = (_, inStack) => {
			return inStack;
		};

		// Create a new `Error`, which automatically gets `stack`
		const err = new Error();

		// Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
		const stack = <NodeJS.CallSite[]><any>err.stack;

		// Restore original `Error.prepareStackTrace`
		Error.prepareStackTrace = origPrepareStackTrace;

		return stack;
	}

}
