import { ValidString, RequiredProperty, ValidNumber, ValidBoolean } from '@plugdata/core';

export class ExampleParams {

	@ValidString({ maxLength: 10 })
	@RequiredProperty()
	public customId: string;

	@ValidNumber({ maximum: 999 })
	@RequiredProperty()
	public num: number;

}

export class ExampleRequest {

	@ValidString({ maxLength: 50 })
	@RequiredProperty()
	public name: string;

	@ValidBoolean()
	public isPublic: boolean;

}

export class ExampleResponse {

	@ValidBoolean()
	public success: boolean;

}

export class ExampleHeaders {

	@ValidString({ pattern: 'Bearer\\s[\\d|a-f]{8}-([\\d|a-f]{4}-){3}[\\d|a-f]{12}' })
	public Authorization: string;

}
