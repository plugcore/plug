
export type DeepPartial<T> = {
	// tslint:disable-next-line: array-type
	[P in keyof T]?: T[P] extends Array<infer U>
	// tslint:disable-next-line: array-type
	? Array<DeepPartial<U>>
	// tslint:disable-next-line: no-shadowed-variable
	: T[P] extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: DeepPartial<T[P]>
};

export type ThenArg<T> = T extends Promise<infer U> ? U : T;
