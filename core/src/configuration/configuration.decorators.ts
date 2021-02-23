import { Inject } from '../dependecy-injection/di.decorators';
import { ClassParameter } from '../utils/typescript.utils';
import { ProjectConfigurationService } from './configuration.service';

/**
 * Decorator made to help you inject the configuration automatically loaded from
 * the project
 * @param sId
 */
export function InjectConfiguration() {
	return (target: Record<string, any> | ClassParameter<any>, propertyName: string, index?: number) => {
		Inject({ sId: ProjectConfigurationService })(target, propertyName, index);
	};
}
