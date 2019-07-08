import { TPrimitive } from './typescript.utils';

export class TypeChecker {

	public static isString(arg: any): arg is string {
		return (this.hasValue(arg) && typeof arg === 'string');
	}

	public static isNumber(arg: any): arg is number {
		return (this.hasValue(arg) && typeof arg === 'number');
	}

	public static isBoolean(arg: any): arg is boolean {
		return (this.hasValue(arg) && typeof arg === 'boolean');
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static isSymbol(arg: any): arg is Symbol {
		return (this.hasValue(arg) && typeof arg === 'symbol');
	}

	public static isUndefined(arg: any): arg is undefined {
		return arg === undefined;
	}

	public static isNull(arg: any): arg is null {
		return arg === null;
	}

	public static isPrimitive(arg: any): arg is TPrimitive {
		return this.isBoolean(arg) || this.isNull(arg) || this.isUndefined(arg) ||
			this.isNumber(arg) || this.isString(arg)  || this.isSymbol(arg);
	}

	public static isObject(arg: any): arg is Record<string, any> {
		return (this.hasValue(arg) && typeof arg === 'object' && !Array.isArray(arg));
	}

	public static isArray<T>(arg: any): arg is T[] {
		return (this.hasValue(arg) && Array.isArray(arg));
	}
	public static isError(arg: any): arg is Error {
		return (this.hasValue(arg) && arg instanceof Error );
	}

	public static typeIsString(arg: Function): boolean {
		return (this.hasValue(arg) && arg === String);
	}

	public static typeIsNumber(arg: Function): boolean {
		return (this.hasValue(arg) && arg === Number);
	}

	public static typeIsBoolean(arg: Function): boolean {
		return (this.hasValue(arg) && arg === Boolean);
	}

	private static hasValue(val: any) {
		return val !== null && val !== undefined;
	}

}
