import { IsString, RequiredProperty, IsNumber, IsBoolean } from '@plugdata/core';

export class ExampleParams {

	@IsString({ maxLength: 10 })
	@RequiredProperty()
	public customId: string;

	@IsNumber({ maximum: 999 })
	@RequiredProperty()
	public num: number;

}

export class ExampleRequest {

	@IsString({ maxLength: 50 })
	@RequiredProperty()
	public name: string;

	@IsBoolean()
	public isPublic: boolean;

}

export class ExampleResponse {

	@IsBoolean()
	public success: boolean;

}

export class ExampleHeaders {

	@IsString({ pattern: 'Bearer\\s[\\d|a-f]{8}-([\\d|a-f]{4}-){3}[\\d|a-f]{12}' })
	public Authorization: string;

}
