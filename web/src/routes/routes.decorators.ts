import { ClassParameter, ObjectUtils, Service } from '@plugdata/core';
import { IControllerOptions, TMethodOptions } from './routes.shared';
import { RoutesUtils } from './routes.utils';

export function Controller(options: IControllerOptions) {
	return function (constructor: ClassParameter<any>) {
		// If arguments size is 1 it means its a class definition
		if (arguments.length === 1) {

			// Register this class as a service
			Service(options && options.service ? ObjectUtils.deepClone(options.service) : undefined)(constructor);

			// Register it as controller
			RoutesUtils.registerController(constructor, options);

		}
	};

}

export function Get(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		// If arguments size is 3 it means its a method definition
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'GET', path, options }, { controller, methodName });
		}
	};
}

export function Head(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'HEAD', path, options }, { controller, methodName });
		}
	};
}

export function Post(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'POST', path, options }, { controller, methodName });
		}
	};
}

export function Put(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'PUT', path, options }, { controller, methodName });
		}
	};
}

export function Delete(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'DELETE', path, options }, { controller, methodName });
		}
	};
}

export function Options(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'OPTIONS', path, options }, { controller, methodName });
		}
	};
}

export function Patch(path?: string, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod({ httpMethod: 'PATCH', path, options }, { controller, methodName });
		}
	};
}
