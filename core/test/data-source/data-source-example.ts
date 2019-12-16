import { InjectConfiguration } from '../../src/configuration/configuration.decorators';
import { Configuration, ConnectionConfiguration } from '../../src/configuration/configuration.interfaces';
import { DataSource } from '../../src/data-source/data-source.decorators';
import { InjectConnection } from '../../src/dependecy-injection/di.decorators';
import { IsNumber, IsString, Required } from '../../src/object-validator/object-validator.decorators';

export class DatasourceExampleConfiguration implements ConnectionConfiguration {

	@Required()
	@IsString({
		pattern: 'test-datasource'
	})
	type: string;

	@Required()
	@IsString()
	stringProp: string;

	@Required()
	@IsNumber()
	numberProp: number;

}

@DataSource({
	type: 'test-datasource'
})
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
