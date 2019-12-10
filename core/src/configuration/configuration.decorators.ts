import { Inject } from '../dependecy-injection/di.decorators';
import { ProjectConfigurationService } from './configuration.service';

/**
 * Decorator made to help you inject the configuration automatically loaded from
 * the project
 * @param sId
 */
export function InjectConfiguration(): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {
		Inject({ sId: ProjectConfigurationService })(target, propertyName, index);
	};
}
