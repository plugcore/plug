import { Required, IsString } from '../object-validator/object-validator.decorators';
import { ConnectionConfiguration } from '../configuration/configuration.interfaces';

export class HttpDsConfiguration implements ConnectionConfiguration {

	@Required()
	@IsString({
		pattern: 'http'
	})
	type: string;

	@Required()
	@IsString({
		pattern: '^(http|https)://.*'
	})
	url: string;

}
