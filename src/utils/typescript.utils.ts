
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
