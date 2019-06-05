
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

	public static isObject(arg: any): arg is Record<string, any> {
		return (this.hasValue(arg) && typeof arg === 'object' && !Array.isArray(arg));
	}

	public static isArray<T>(arg: any): arg is T[] {
		return (this.hasValue(arg) && Array.isArray(arg));
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
