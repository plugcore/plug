import { inspect } from 'util';
import { StringConstants } from '../constants/string.constants';

export class StringUtils {

	/**
	 * Shows the string version of the given object with 2 levels
	 * of properties depth, but it can be changed with the depth
	 * parameter. It uses the same format that `console.log`, it's
	 * not a valid JSON
	 * @param inp
	 * @param depth
	 */
	public static objToStr(inp: Record<string, any>, depth?: number): string {
		return inspect(inp, { showHidden: false, depth: depth || 2 });
	}

	/**
	 * Returns a string with all the elements in the input array
	 * separated by commas
	 * @param inp
	 */
	public static arrayToString(inp: any[]): string {
		return (inp && inp.length) ? inp.join(', ') : StringConstants.blank;
	}

	/**
	 * Replaces non ASCII characters
	 * @param inp
	 */
	public static normalizeText(inp: string, toLowerCase?: boolean, replaceSpaces?: boolean): string {
		let result = (inp || '').normalize('NFKD').replace(/[\u0300-\u036F]/g, '').replace(/[^0-9a-zA-Z ]/g, '');
		result = toLowerCase ? result.toLocaleLowerCase() : result;
		result = replaceSpaces ? result.replace(/ /g, '-') : result;
		return result;
	}

	/**
	 * Creates a random string id with A-z chars
	 * @param length 7 by default
	 */
	public static createRandomId(length?: number) {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < (length || 7); i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	/**
	 * Uppercases the first letter
	 * @param inp
	 */
	public static capitalize(inp: string) {
		if (!inp || typeof inp !== 'string') {
			return inp;
		}
		return inp.charAt(0).toUpperCase() + inp.slice(1);
	}

}
