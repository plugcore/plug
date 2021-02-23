

export type DeepPartial<T> = {
	// tslint:disable-next-line: array-type
	[P in keyof T]?: T[P] extends (infer U)[]
	// tslint:disable-next-line: array-type
		? DeepPartial<U>[]
	// tslint:disable-next-line: no-shadowed-variable
		: T[P] extends readonly (infer U)[]
			? readonly DeepPartial<U>[]
			: DeepPartial<T[P]>
};

export type ThenArg<T> = T extends Promise<infer U> ? U : T;

// https://stackoverflow.com/questions/48215950/exclude-property-from-type
/**
 * Removes properties from type
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type TPrimitive = boolean | null | undefined | number | string | Symbol;

// eslint-disable @typescript-eslint/prefer-interface
export interface ClassParameter<T> { new (...args: any[]): T }

export type Await<T> = T extends Promise<infer U> ? U : T
export type AwaitProps<T> = {[P in keyof T]: Await<T[P]>}
