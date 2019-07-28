import { ClassParameter, ObjectUtils, Service } from '@plugdata/core';
import { IControllerOptions, TMethodOptions } from './routes.shared';
import { RoutesUtils } from './routes.utils';

export function Controller(options?: IControllerOptions) {
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

export function Get(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		// If arguments size is 3 it means its a method definition
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('GET', { controller, methodName }, options);
		}
	};
}

export function Head(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('HEAD', { controller, methodName }, options);
		}
	};
}

export function Post(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('POST', { controller, methodName }, options);
		}
	};
}

export function Put(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('PUT', { controller, methodName }, options);
		}
	};
}

export function Delete(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('DELETE', { controller, methodName }, options);
		}
	};
}

export function Options(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('OPTIONS', { controller, methodName }, options);
		}
	};
}

export function Patch(options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			RoutesUtils.registerMethod('PATCH', { controller, methodName }, options);
		}
	};
}
