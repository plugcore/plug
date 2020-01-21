import { TPrimitive, ClassParameter } from './typescript.utils';

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

	public static isClass(arg: any): arg is ClassParameter<any> {
		// https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function#answer-32235645
		// eslint-disable-next-line no-prototype-builtins
		return (this.hasValue(arg) && typeof arg === 'function' && (<any>arg).hasOwnProperty('prototype') && !(<any>arg).hasOwnProperty('arguments'));
	}

	public static isBuffer(arg: any): arg is Buffer {
		return Buffer.isBuffer(arg);
	}

	public static isPromise<T = unknown>(arg: any): arg is Promise<T> {
		return arg instanceof Promise;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static typeIsString(arg: any): arg is String  {
		return (this.hasValue(arg) && arg === String);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static typeIsNumber(arg: any): arg is Number {
		return (this.hasValue(arg) && arg === Number);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public static typeIsBoolean(arg: any): arg is Boolean {
		return (this.hasValue(arg) && arg === Boolean);
	}

	public static typeIsPrimitive(arg: any): arg is TPrimitive {
		return this.typeIsString(arg) || this.typeIsNumber(arg) || this.typeIsBoolean(arg);
	}
	private static hasValue(val: any) {
		return val !== null && val !== undefined;
	}

}
