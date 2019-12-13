
/**
 * Defines how the object transformation has to be done
 */
export type ObjectMappingDefinition<T> = Record<string, ObjectMappingValue<T> | ObjectMappingValue<T>[] | string | string[]>;

/**
 * Function that has already stored a mapping operation and transform objects from
 * one structure to another
 */
export type ObjectMapping<T1, T2> = (sourceObject: T1) => T2;

export interface ObjectMappingValue<T, K extends keyof T = any> {
	key: K | string;
	transform: (inp: T[K] | any) => any;
	default?: () => T[K] | string | number | any;
}
