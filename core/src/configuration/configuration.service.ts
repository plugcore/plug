import { Service } from '../dependecy-injection/di.decorators';
import { Configuration } from './configuration.interfaces';
import { ObjectUtils } from '../utils/object.utils';

@Service()
export class ProjectConfigurationService {

	private frozenConfiguration: Configuration;

	constructor(
		originalConfiguration: Configuration
	) {
		this.frozenConfiguration = ObjectUtils.deepFreeze(
			ObjectUtils.deepClone(originalConfiguration || {})
		);
		for (const cfgKey of Object.keys(this.frozenConfiguration)) {
			(<Record<string, any>>this)[cfgKey] = (<Record<string, any>>this).frozenConfiguration[cfgKey];
		}
	}

}

