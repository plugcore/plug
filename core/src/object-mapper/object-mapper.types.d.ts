
declare module 'object-mapper' {

	export function merge<T1 = any, T2 = any>(sourceObject: T1, mapObject: Record<string, any>): T2;
	export function merge<T1 = any, T2 = any>(sourceObject: T1, destinationObject: T2 | any, mapObject: Record<string, any>): T2;

}
