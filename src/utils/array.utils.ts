
export class ArrayUtils {

	public static append<T>(val: object, arr?: any[]): T[] {
		arr = arr || [];
		arr.push(val);
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
	 * Safely flattens an "N" lelvs deep array of arrays
	 * @param arr
	 */
	public static flat<T>(arr: T[][]): T[] {
		if (!arr) {
			return [];
		}
		return arr.reduce<T[]>((curr, toFlatten) => curr.concat(toFlatten), <T[]>[]);
	}

	/**
	 * Flats an array of arrays and removes all dplicate entries
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
	public static countOcurrences(array: string[]): { [key: string]: number } {
		const diffrenetElements = Array.from(new Set(array));
		const emptyObj: { [key: string]: number } = {};
		return diffrenetElements.reduce((prev, curr) => {
			prev[curr] = array.filter(y => y === curr).length;
			return prev;
		}, emptyObj);
	}

	/**
	 * Safely filters outs all of the strings of the original array from
	 * the filter one
	 * @param original
	 * @param toFilter
	 */
	public static filterArrs(original: string[], toFilter: string[]) {
		return (original || []).filter(f => !(toFilter || []).includes(f));
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
	 * Creates an object witch keys are dediffernt types of values of
	 * the field, and inside it has all the objects that have the same value.
	 * Example: `[{a: 1}, {a: 2}, {a:1}]` = `{ 1: [{a: 1}, {a: 1}], 2: [{a: 2}]}`
	 * @param arr
	 * @param field
	 */
	public static groupBy<T>(arr: T[], field: keyof T): { [key: string]: T[] } {
		return (arr || []).reduce((prev, curr) => {
			prev[<any>curr[field]] = (prev[<any>curr[field]] || []).concat(curr);
			return prev;
		}, <{ [key: string]: T[] }>{});
	}

	/**
	 * Puts the value of the field as an property of the object.
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

	/**
	 * Creates an array from 0 to n, ex: `[0, 1, 2, 3, ...n]`
	 * @param length
	 */
	public static from0toN(length: number): number[] {
		return <number[]>Array.apply(null, <any>{ length }).map(Number.call, Number);
	}

}
