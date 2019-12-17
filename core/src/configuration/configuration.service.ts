import { Service } from '../dependecy-injection/di.decorators';
import { Configuration, ConnectionConfiguration } from './configuration.interfaces';
import { ObjectUtils } from '../utils/object.utils';
import { ClassParameter } from '../utils/typescript.utils';
import { ObjectValidator } from '../object-validator/object-validator.service';
import { TypeChecker } from '../utils/type.checker';

@Service()
export class ProjectConfigurationService implements Configuration {

	public init: Configuration['init'];
	public log: Configuration['log'];
	public connections: Configuration['connections'];

	private frozenConfiguration: Configuration;

	constructor(
		originalConfiguration: Configuration,
		private objectValidator: ObjectValidator
	) {
		this.frozenConfiguration = ObjectUtils.deepFreeze(
			ObjectUtils.deepClone(originalConfiguration || {})
		);
		for (const cfgKey of Object.keys(this.frozenConfiguration)) {
			(<Record<string, any>>this)[cfgKey] = (<Record<string, any>>this).frozenConfiguration[cfgKey];
		}
	}

	public getConnectionConfiguration<T extends ConnectionConfiguration>(configurationClass: ClassParameter<T>, connection: string): T {
		const connectionConfiguration = this.frozenConfiguration.connections && this.frozenConfiguration.connections[connection];
		if (!connectionConfiguration) {
			throw new Error('No connection found with name: ' + connection);
		}

		const validator = this.objectValidator.compileFromClass(configurationClass);
		const isValid = this.objectValidator.validate(validator, connectionConfiguration);

		if (!isValid.valid) {
			throw new Error(
				`Invalid configuration in ${connection} for this type of connection ` +
				isValid.errors.map(o => TypeChecker.isObject(o) ? JSON.stringify(o) : `${o}`).join(', ')
			);
		}

		return <any>connectionConfiguration;
	}

}

