import { Inject } from '../dependecy-injection/di.decorators';

/**
 * Decorator made to easily inject name logger instances.
 * The name argument will be used to make that the uotput log objects
 * have a "name" property with this value. This way we can easly
 * filters logs with this name when they are stored in the db
 * @param sId
 */
export function InjectLogger(name?: string): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {
		Inject({ variation: name ? { name } : undefined })(target, propertyName, index);
	};

}
