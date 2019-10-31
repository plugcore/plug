/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class ArrayUtils {

	/**
	 * Pushes the value/s to an existing array, or creates a
	 * new one
	 * @param val
	 * @param arr
	 */
	public static append<T>(val: T | T[], arr?: any[]): T[] {
		arr = arr || [];
		if (Array.isArray(val)) {
			arr = arr.concat(val);
		} else {
			arr.push(val);
		}
		return arr;
	}

	/**
	 * Returns an array containing only the values that are
	 * reapeated in both arrays
	 * @param arr1
	 * @param arr2
	 */
	public static onlySame<T>(arr1: T[], arr2: T[]): T[] {
		return arr1.filter(val => {
			return arr2.indexOf(val) !== -1;
		});
	}

	/**
	 * Safely flattens an "N" levels deep array of arrays
	 * @param arr
	 */
	public static flat<T>(arr: T[][]): T[] {
		if (!arr) {
			return [];
		}
		return arr.reduce<T[]>((curr, toFlatten) => curr.concat(toFlatten), <T[]>[]);
	}

	/**
	 * Flats an array of arrays and removes all duplicate entries
	 * @param inp
	 */
	public static flatAndRemoveDuplicates<T>(inp: T[][]): T[] {
		return this.removeDuplicates(this.flat(inp));
	}

	/**
	 * Removes duplicate entries
	 * @param inp
	 */
	public static removeDuplicates<T>(inp: T[]): T[] {
		return Array.from(new Set(inp));
	}

	/**
	 * Returns a map with all the repeated ocurrences counted.
	 * Example: `ArrayUtils.countOcurrences([1, 1, 2]).get(1) // Returns 2 `
	 * @param array
	 */
	public static countOcurrences<T extends string | number>(
		array: T[]
	): T extends string ? { [key: string]: number } : { [key: number]: number } {
		const diffrenetElements = Array.from(new Set(array));
		const emptyObj: any = {};
		return diffrenetElements.reduce((prev, curr) => {
			prev[curr] = array.filter(y => y === curr).length;
			return prev;
		}, emptyObj);
	}

	/**
	 * Filters out all of the values from the original array that also
	 * appears in the second array, es: `([1, 2], [1]) = [2]`
	 * @param original
	 * @param toFilter
	 */
	public static filterArrs<T>(original: T[], toFilter: T[]): T[] {
		return original.filter(f => !toFilter.includes(f));
	}

	/**
	 * Checks if two arrays have the same contents independly of the order
	 */
	public static contentsAreTheSame<T>(arr1: T[], arr2: T[]) {
		return arr1 === arr2 ? true
			: !arr1 && !arr2 ? true
			: ((!arr1 && arr2) || (arr1 && !arr2)) ? false
			: arr1.length !== arr2.length ? false
			: arr1.every(el1 => arr2.includes(el1));
	}

	/**
	 * Checks if any of the contents of one array are in the other one
	 */
	public static someContentsAreTheSame<T>(arr1: T[], arr2: T[]) {
		return arr1 === arr2 ? true
			: !arr1 && !arr2 ? true
			: ((!arr1 && arr2) || (arr1 && !arr2)) ? false
			: arr1.some(el1 => arr2.some(el2 => el1 === el2));

	}

	/**
	 * Creates an array from 0..maxNum, example:
	 * `[0, 1]` from a maxNum of `2`. The offset is
	 * if you want something like: `[1, 2]` with an
	 * offset of 1
	 * @param maxNum
	 */
	public static orderedNumArray(maxNum: number, ofset: number = 0) {
		return Array(maxNum).fill(0).map((_, i) => i + ofset);
	}

	/**
	 * Creates an object which keys are different types of values of the field,
	 * and inside it has all the objects that have the same value.
	 * Example: `[{a: 1}, {a: 2}, {a:1}]` = `{ 1: [{a: 1}, {a: 1}], 2: [{a: 2}]}`
	 * The `null` return type is there to prevent using keys wich value is not
	 * string or number, but it will allways try to return an object
	 * @param arr
	 * @param field
	 */
	public static groupBy<T, K extends keyof T>(
		arr: T[], field: K
	): (
		T[K] extends string ? { [key: string]: T[] } :
		T[K] extends number ? { [key: number]: T[] } :
		null) {
		return arr.reduce((prev, curr) => {
			prev[curr[field]] = (prev[curr[field]] || []).concat(curr);
			return prev;
		}, <any>{});
	}

	/**
	 * Puts the value of the field as a property of the object.
	 * Be sure that every object in the array has differente values.
	 * @param arr
	 * @param field
	 */
	public static indexByField<T>(arr: T[], field: keyof T): { [key: string]: T } {
		return (arr || []).reduce((prev, curr) => {
			prev[<any>curr[field]] = curr;
			return prev;
		}, <{ [key: string]: T }>{});

	}

}
