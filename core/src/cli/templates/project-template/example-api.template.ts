
export const exampleApiTemplate = `
import { IsNumber, IsString, Required } from '@plugcore/core';
import { Example } from "./example.shared";

export class ExampleResponse implements Example {

	@Required()
	@IsString()
	id: string;

	@Required()
	@IsString()
	title: string;

	@Required()
	@IsNumber()
	quantity: number;

}

export class ExampleUpdateRequest implements Omit<Example, 'id'> {

	@Required()
	@IsString()
	title: string;

	@Required()
	@IsNumber()
	quantity: number;

}

export class ExampleIdParam {

	@Required()
	@IsString()
	id: string;

}

`;
