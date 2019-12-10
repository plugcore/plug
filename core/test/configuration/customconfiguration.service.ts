import { InjectConfiguration } from '../../src/configuration/configuration.decorators';
import { Configuration } from '../../src/configuration/configuration.interfaces';
import { Service } from '../../src/dependecy-injection/di.decorators';

@Service()
export class CustomConfigurationService {

	constructor(
		@InjectConfiguration() private configuration: Configuration
	) {}

	public getConfiguration() {
		return this.configuration;
	}

}
