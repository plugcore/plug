import { Service } from '../dependecy-injection/di.decorators';
import { IConfiguration } from './configuration.interfaces';
import { ObjectUtils } from '../utils/object.utils';

@Service()
export class ProjectConfiguration<T = undefined> implements IConfiguration<T> {

	public init: IConfiguration<T>['init'];
	public log: IConfiguration<T>['log'];
	public custom: IConfiguration<T>['custom'];

	private frozenConfiguration: IConfiguration<T>;

	constructor(
		originalConfiguration: IConfiguration<T>
	) {
		this.frozenConfiguration = ObjectUtils.deepFreeze(
			ObjectUtils.deepClone(originalConfiguration || {})
		);
		for (const cfgKey of Object.keys(this.frozenConfiguration)) {
			(<Record<string, any>>this)[cfgKey] = (<Record<string, any>>this).frozenConfiguration[cfgKey];
		}
	}

}

