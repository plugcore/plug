import { Service, InjectConnection } from '../../src/dependecy-injection/di.decorators';
import { InjectConfiguration } from '../../src/configuration/configuration.decorators';
import { Configuration, ConnectionConfiguration } from '../../src/configuration/configuration.interfaces';
import { IsString, Required, IsNumber } from '../../src/object-validator/object-validator.decorators';

export class DatasourceExampleConfiguration implements ConnectionConfiguration {

	@Required()
	@IsString()
	type: string;

	@Required()
	@IsString()
	stringProp: string;

	@Required()
	@IsNumber()
	numberProp: number;

}

@Service()
export class DataSourceExample {

	private connectionConfiguration: DatasourceExampleConfiguration;

	constructor(
		@InjectConnection() private connection: string,
		@InjectConfiguration() private configuration: Configuration
	) {
		this.connectionConfiguration = this.configuration.
			getConnectionConfiguration(DatasourceExampleConfiguration, this.connection);
	}

	public getConfiguration() {
		return this.connectionConfiguration;
	}

	public getConnection() {
		return this.connection;
	}

}
