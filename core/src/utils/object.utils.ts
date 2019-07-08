import { ArrayUtils } from './array.utils';
import { TypeChecker } from './type.checker';
import { IObjectEntry } from './utils.interfaces';

export class ObjectUtils {

	/**
	 * Recursively removes all unused attributes of an object
	 * @param inp
	 */
	public static deepReduction(inp: Record<string, any>) {

		Object.keys(inp).forEach(key => {
			const val = inp[key];
			if (val === undefined || val === null) {
				delete inp[key];
			} else {
				const inpFieldKeys = Object.keys(val);
				if (inpFieldKeys && inpFieldKeys.length > 0) {
					inpFieldKeys.forEach(subKey => {

						const subVal = val[subKey];
						if (subVal === undefined || subVal === null) {
							delete val[subKey];
						} else {
							if (!TypeChecker.isString(subVal)) {
								ObjectUtils.deepReduction(subVal);
							}
						}
					});
				}
			}
		});

	}

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
	public static detectChanges<T, K>(origObject: T, newObject: K, overrideAttrWithMissingElements?: boolean): Partial<T & K> {

		const resultObj: any = {};
		const origKeys = Object.keys(origObject);
		const newgKeys = Object.keys(newObject);
		const bothKeys = ArrayUtils.onlySame(origKeys, newgKeys);
		const newKeys = newgKeys.filter(val => !origKeys.includes(val));

		if (overrideAttrWithMissingElements &&
			TypeChecker.isObject(origObject) && TypeChecker.isObject(newObject) &&
			origKeys.length > newgKeys.length
		) {
			return newObject;
		}

		bothKeys.forEach(key => {

			const origVal = (<any>origObject)[key];
			const newVal = (<any>newObject)[key];

			if (origVal !== null && origVal !== undefined && newVal !== null && newVal !== undefined) {

				const origValKeys = Object.keys(origVal);
				const newValKeys = Object.keys(newVal);
				const origIsObj = !TypeChecker.isString(origVal) && origValKeys.length > 0;
				const newIsObj = !TypeChecker.isString(newVal) && newValKeys.length > 0;

				if (TypeChecker.isObject(origVal) || Array.isArray(origVal) || TypeChecker.isObject(newVal) || Array.isArray(newVal)) {
					if (Array.isArray(origVal) && Array.isArray(newVal)) {
						const newArrVal = ObjectUtils.detectChangesBetweenArrays(origVal, newVal);
						if (newArrVal.length > 0) {
							resultObj[key] = newArrVal;
						}
					} else if (Array.isArray(origIsObj) || Array.isArray(newIsObj)) {
						resultObj[key] = newVal;
					} else if (!(origValKeys.length === 0 && newValKeys.length === 0)) {
						const changesObject = ObjectUtils.detectChanges(origVal, newVal, overrideAttrWithMissingElements);
						if (Object.keys(changesObject).length > 0) {
							resultObj[key] = changesObject;
						}
					}
				} else if (!origIsObj && newIsObj) {
					resultObj[key] = newVal;
				} else {
					if (origVal !== newVal) {
						resultObj[key] = newVal;
					}
				}

			} else if (newVal !== null && newVal !== undefined) {
				resultObj[key] = newVal;
			}

		});

		newKeys.forEach(key => {
			resultObj[key] = (<any>newObject)[key];
		});

		return resultObj;

	}

	public static detectChangesBetweenArrays(arr1: any[], arr2: any[]) {
		const newArrVal: any[] = [];
		if (arr1.length > arr2.length || arr1.length < arr2.length) {
			return arr2;
		}
		for (let index = 0; index < arr1.length; index++) {
			const varArr1 = arr1[index];
			const varArr2 = arr2[index];
			if (TypeChecker.isObject(varArr1) && TypeChecker.isObject(varArr2)) {
				const diff = ObjectUtils.detectChanges(varArr1, varArr2);
				if (diff && Object.keys(diff).length > 0) {
					newArrVal.push(diff);
				}
			} else if (TypeChecker.isObject(varArr1) || TypeChecker.isObject(varArr2)) {
				newArrVal.push(varArr2);
			} else if (
				!(Array.isArray(varArr1) && Array.isArray(varArr2) && varArr1.length === 0 && varArr2.length === 0) &&
				(varArr2 !== null && varArr2 !== undefined && varArr1 !== varArr2)
			) {
				newArrVal.push(varArr2);
			}
		}
		return newArrVal;
	}

	/**
	 * Deeply merges two or more objects, it means that all sub properties of all the
	 * source objects will be applied to the target object
	 * @param target
	 * @param sources
	 */
	public static deepMerge<T, K>(target: T, ...sources: K[]): T | T & K {

		if (!sources.length) {
			return target;
		}
		const source = sources.shift();
		if (source === undefined) {
			return target;
		}

		if (this.isMergebleObject(target) && this.isMergebleObject(source)) {
			Object.keys(source).forEach((key: string) => {
				const sourceAttr = (<any>source)[key];
				const targetAttr = (<any>target)[key];
				if (this.isMergebleObject(targetAttr)) {
					(<any>target)[key] = this.deepMerge(targetAttr, sourceAttr || {});
				} else if (Array.isArray(sourceAttr) && Array.isArray(targetAttr)) {
					(<any>target)[key] = ObjectUtils.mergeArrays(targetAttr, sourceAttr);
				} else {
					(<any>target)[key] = (sourceAttr === null || sourceAttr === undefined) ? targetAttr : sourceAttr;
				}
			});
		}

		return this.deepMerge(target, ...sources);
	}

	/**
	 * Deeply merges two or more objects, it means that all sub properties of all the
	 * source objects will be applied to the target object
	 * @param target
	 * @param sources
	 */
	public static mergeArrays<T, K>(originArr: T[], newArr: K[]): (T | K)[] {
		if ((!originArr || originArr.length === 0) && (!newArr || newArr.length === 0)) {
			return [];
		}
		if ((!originArr || originArr.length === 0) && (newArr && newArr.length > 0)) {
			return newArr;
		}
		if (originArr && (!newArr || newArr.length === 0)) {
			return originArr;
		}

		let newArrVal: (T | K)[] = [];
		const minLength = originArr.length > newArr.length ? newArr.length : originArr.length;
		if (minLength > 0) {
			for (let index = 0; index < minLength; index++) {
				const varArr1 = originArr[index];
				const varArr2 = newArr[index];
				if (TypeChecker.isObject(varArr1) && TypeChecker.isObject(varArr2)) {
					newArrVal.push(ObjectUtils.deepMerge(<any>varArr1, varArr2));
				} else {
					newArrVal.push(varArr2);
				}
			}
			if (originArr.length > minLength) {
				newArrVal = newArrVal.concat(originArr.slice(originArr.length - minLength - 1));
			} else if (newArr.length > minLength) {
				newArrVal = newArrVal.concat(newArr.slice(newArr.length - minLength - 1));
			}
		}
		return newArrVal;
	}

	/**
	 * Deep and truly clones a js object without the problems of
	 * `Object.assign({}, obj)` with sub properties
	 * https://stackoverflow.com/a/40294058
	 * @param obj Object to clone
	 * @param hash internal ussage hash
	 */
	public static deepClone<T extends Record<string, any>>(obj: T, hash = new WeakMap()): T {

		if (Object(obj) !== obj) { return obj; } // primitives
		if (obj instanceof Set) { return <any>(new Set(obj)); }
		if (Buffer.isBuffer(obj)) { return obj; }
		if (hash.has(obj)) { return hash.get(obj); } // cyclic reference
		const result = obj instanceof Date ? new Date(obj)
			: obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
			: obj.constructor ? new (<any>obj).constructor()
			: Object.create(null);
		hash.set(obj, result);

		if (obj instanceof Map) {

			Array.from(obj, ([key, val]) => result.set(key, this.deepClone(val, hash)));
		}
		return Object.assign(result, ...Object.keys(obj).map(
			key => ({ [key]: this.deepClone((<any>obj)[key], hash) })));
	}

	/**
	 * Deletes all object properties wich are null or undefined
	 * @param obj
	 */
	public static cleanObject<T>(obj: T) {
		Object.keys(obj).forEach(key => {
			const propVal = (<any>obj)[key];
			if (propVal === null || propVal === undefined) {
				delete (<any>obj)[key];
			} else {
				if (!Buffer.isBuffer(propVal) && typeof propVal === 'object') {
					this.cleanObject(propVal);
				}
			}
		});
		return obj;
	}

	/**
	 * Removes all attributes that are like `{ attr: {} }` and it does it recursivley,
	 * it means that `{ attr: { sub: {} }  }` = `{}`
	 * @param obj
	 */
	public static cleanEmptyObjects<T>(obj: T) {
		Object.keys(obj).forEach(key => {
			const propVal = (<any>obj)[key];
			if (TypeChecker.isObject(propVal) && Object.keys(propVal).length === 0) {
				delete (<any>obj)[key];
			} else {
				if (!Buffer.isBuffer(propVal) && TypeChecker.isObject(propVal)) {
					this.cleanEmptyObjects(propVal);
					if (TypeChecker.isObject((<any>obj)[key]) && Object.keys((<any>obj)[key]).length === 0) {
						delete (<any>obj)[key];
					}
				}
			}
		});
		return obj;
	}

	/**
	 * Removes all attributes that are like `{ attr: [] }`
	 * @param obj
	 */
	public static cleanEmptyArrays<T>(obj: T) {
		Object.keys(obj).forEach(key => {
			const propVal = (<any>obj)[key];
			if (Array.isArray(propVal) && propVal.length === 0) {
				delete (<any>obj)[key];
			} else {
				if (!Buffer.isBuffer(propVal) && TypeChecker.isObject(propVal)) {
					this.cleanEmptyArrays(propVal);
				}
			}
		});
		return obj;
	}

	/**
	 * Returns an array with an entry for every value in the object, it goes throught
	 * all sub properties and array elements.
	 * @param obj 
	 * @param func 
	 */
	public static walkThroughObject<T extends Record<string, any>>(obj: T, currVals: IObjectEntry[] = []): IObjectEntry[] {

		for (const [key, value] of Object.entries(obj)) {
			if (TypeChecker.isPrimitive(value)) {
				currVals.push(<IObjectEntry>{
					value: obj[key],
					objRef: obj,
					key: key
				});
			} else if (TypeChecker.isObject(value) || TypeChecker.isArray(value)) {
				this.walkThroughObject(value, currVals);
			}
		}

		return currVals;

	}

	/**
	 * Behaves like `Object.assign()` but takes into account subproperties
	 * @param base 
	 * @param override 
	 */
	public static deepAssign<T extends Record<string, any>, K extends Record<string, any>>(base: T, override: K): T & K {

		const result: Record<string, any> = this.deepClone(base || {});

		for (const [key, value] of Object.entries(override)) {
			if (TypeChecker.isPrimitive(value) || TypeChecker.isArray(value)) {
				result[key] = value;
			} else if (TypeChecker.isObject(value)) {
				result[key] = this.deepAssign(result[key], value);
			}
		}

		return <T & K>result;

	}

	/**
	 * Applies `Object.freeze()` recursivley to all objects defined as properties from
	 * the original object. See frozen objects in
	 * [MDN documentation](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/freeze).
	 * 
	 */
	public static deepFreeze<T>(object: any): T {

		for (const name of Object.getOwnPropertyNames(object)) {
			const value = object[name];
			object[name] = value && TypeChecker.isObject(value) ?
				this.deepFreeze(value) : value;
		}

		return Object.freeze(object);

	}

	private static isMergebleObject(item: any): boolean {
		return TypeChecker.isObject(item) && !TypeChecker.isArray(item);
	}

}
