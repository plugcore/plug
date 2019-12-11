import { deepStrictEqual, strictEqual } from 'assert';

export class ValidatorUtils {

	/**
	 * Determines that the param is not null nor undefined.
	 * If it's an string, then it also determines that the string is not empty
	 */
	public static isDefined<T>(inp: T | undefined | null): inp is T {
		return inp !== null && inp !== undefined;
	}

	/**
	 * Wrapper of Nodejs `assert.deepStrictEqual`, determines if both objects
	 * have the same properties an properties values
	 * @param obj1
	 * @param obj2
	 */
	public static deepEqual<T1 = Record<string, any>, T2 = Record<string, any>>(obj1: T1, obj2: T1 | T2): obj2 is T1 {
		try {
			deepStrictEqual(obj1, obj2);
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Wrapper of Nodejs `assert.strictEqual`, determines if two variables are the same.
	 * If you wish to compare objects, use `ValidatorUtils.deepEqual`, this is ment to
	 * other variable types such as  strings, numbers, etc.
	 * @param inp1
	 * @param inp2
	 */
	public static equal<T1, T2>(inp1: T1, inp2: T1 | T2): inp2 is T1 {
		try {
			strictEqual(inp1, inp2);
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Check if the string desn't exists or it has an empty value
	 * @param inp
	 */
	public static isBlank(inp: string | undefined | null): inp is undefined | null | '' {
		return inp === null || inp === undefined || inp.trim() === '';
	}

	/**
	 * Check if the string exists and has value
	 * @param inp
	 */
	public static isNotBlank(inp: string | undefined | null): inp is string {
		return !this.isBlank(inp);
	}

}
