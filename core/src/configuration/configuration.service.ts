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
		private originalConfiguration: IConfiguration<T>
	) {
		this.frozenConfiguration = ObjectUtils.deepFreeze(
			ObjectUtils.deepClone(originalConfiguration)
		);
		this.init = this.frozenConfiguration.init;
		this.log = this.frozenConfiguration.log;
		this.custom = this.frozenConfiguration.custom;
	}

}

 