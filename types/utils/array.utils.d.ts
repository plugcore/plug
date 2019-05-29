export declare class ArrayUtils {
    static append<T>(val: object, arr?: any[]): T[];
    /**
     * Returns an array containing only the values that are
     * reapeated in both arrays
     * @param arr1
     * @param arr2
     */
    static onlySame<T>(arr1: T[], arr2: T[]): T[];
    /**
     * Safely flattens an "N" lelvs deep array of arrays
     * @param arr
     */
    static flat<T>(arr: T[][]): T[];
    /**
     * Flats an array of arrays and removes all dplicate entries
     * @param inp
     */
    static flatAndRemoveDuplicates<T>(inp: T[][]): T[];
    /**
     * Removes duplicate entries
     * @param inp
     */
    static removeDuplicates<T>(inp: T[]): T[];
    /**
     * Returns a map with all the repeated ocurrences counted.
     * Example: `ArrayUtils.countOcurrences([1, 1, 2]).get(1) // Returns 2 `
     * @param array
     */
    static countOcurrences(array: string[]): {
        [key: string]: number;
    };
    /**
     * Safely filters outs all of the strings of the original array from
     * the filter one
     * @param original
     * @param toFilter
     */
    static filterArrs(original: string[], toFilter: string[]): string[];
    /**
     * Checks if two arrays have the same contents independly of the order
     */
    static contentsAreTheSame<T>(arr1: T[], arr2: T[]): boolean;
    /**
     * Checks if any of the contents of one array are in the other one
     */
    static someContentsAreTheSame<T>(arr1: T[], arr2: T[]): boolean;
    /**
     * Creates an array from 0..maxNum, example:
     * `[0, 1]` from a maxNum of `2`. The offset is
     * if you want something like: `[1, 2]` with an
     * offset of 1
     * @param maxNum
     */
    static orderedNumArray(maxNum: number, ofset?: number): number[];
    /**
     * Creates an object witch keys are dediffernt types of values of
     * the field, and inside it has all the objects that have the same value.
     * Example: `[{a: 1}, {a: 2}, {a:1}]` = `{ 1: [{a: 1}, {a: 1}], 2: [{a: 2}]}`
     * @param arr
     * @param field
     */
    static groupBy<T>(arr: T[], field: keyof T): {
        [key: string]: T[];
    };
    /**
     * Puts the value of the field as an property of the object.
     * Be sure that every object in the array has differente values.
     * @param arr
     * @param field
     */
    static indexByField<T>(arr: T[], field: keyof T): {
        [key: string]: T;
    };
    /**
     * Creates an array from 0 to n, ex: `[0, 1, 2, 3, ...n]`
     * @param length
     */
    static from0toN(length: number): number[];
}
