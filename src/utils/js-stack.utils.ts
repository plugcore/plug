
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

	private static getStack() {

		// Save original Error.prepareStackTrace
		const origPrepareStackTrace = Error.prepareStackTrace;

		// Override with function that just returns `stack`
		Error.prepareStackTrace = function (_, inStack) {
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
