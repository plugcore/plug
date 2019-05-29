export declare class ObjectUtils {
    /**
     * Recursively removes all unused attributes of an object
     * @param inp
     */
    static deepReduction(inp: any): void;
    /**
     * Detects all the new or modified attributres from the original
     * objtect to the new object recursively. It excludes the attributes
     * this are not defined in the new object.
     * The overrideAttrWithMissingElements paramter will override any object attribute that has
     * missing sub attributes in the original object, example: __origObject__ `{ a: { a1: 1, a2: 2 }}`
     * __newObject__ `{ a: {a1: 1 }}` the result will be `{ a: {a1: 1 }}`
     * @param origObject
     * @param newObject
     * @param overrideAttrWithMissingElements
     */
    static detectChanges(origObject: any, newObject: any, overrideAttrWithMissingElements?: boolean): any;
    static detectChangesBetweenArrays(arr1: any[], arr2: any[]): any[];
    /**
     * Deeply merges two or more objects, it means that all sub properties of all the
     * source objects will be applied to the target object
     * @param target
     * @param sources
     */
    static deepMerge<T extends object = object>(target: T, ...sources: T[]): T;
    /**
     * Deeply merges two or more objects, it means that all sub properties of all the
     * source objects will be applied to the target object
     * @param target
     * @param sources
     */
    static mergeArrays<T, K>(originArr: T[], newArr: K[]): (T | K)[] | undefined;
    /**
     * Deep and truly clones a js object without the problems of
     * `Object.assign({}, obj)` with sub properties
     * https://stackoverflow.com/a/40294058
     * @param obj Object to clone
     * @param hash internal ussage hash
     */
    static deepClone<T extends Object>(obj: T, hash?: WeakMap<object, any>): T;
    /**
     * Deletes all object properties wich are null or undefined
     * @param obj
     */
    static cleanObject<T>(obj: T): T;
    /**
     * Removes all attributes that are like `{ attr: {} }` and it does it recursivley,
     * it means that `{ attr: { sub: {} }  }` = `{}`
     * @param obj
     */
    static cleanEmptyObjects<T>(obj: T): T;
    /**
     * Removes all attributes that are like `{ attr: [] }`
     * @param obj
     */
    static cleanEmptyArrays<T>(obj: T): T;
    private static isMergebleObject;
}
