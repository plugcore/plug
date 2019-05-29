export declare class TypeChecker {
    static isString(arg: any): arg is String;
    static isNumber(arg: any): arg is Number;
    static isBoolean(arg: any): arg is Boolean;
    static isObject(arg: any): arg is Object;
    static isArray<T>(arg: any): arg is T[];
    static typeIsString(arg: Function): boolean;
    static typeIsNumber(arg: Function): boolean;
    static typeIsBoolean(arg: Function): boolean;
}
