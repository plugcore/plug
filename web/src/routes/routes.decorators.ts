import { ClassParameter, ObjectUtils, Service, TypeChecker } from '@plugdata/core';
import { IControllerOptions, TMethodOptions } from './routes.shared';
import { RoutesUtils } from './routes.utils';

//
// Route recorators
//

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

export function Get(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		// If arguments size is 3 it means its a method definition
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'GET', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Head(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'HEAD', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Post(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'POST', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Put(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'PUT', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Delete(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'DELETE', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Options(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'OPTIONS', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

export function Patch(path?: string | TMethodOptions, options?: TMethodOptions) {
	return function (controller: any, methodName: string) {
		if (arguments.length === 3) {
			const realPath = TypeChecker.isString(path) ? path : undefined;
			const realOptions = TypeChecker.isString(path) ? options : path;
			RoutesUtils.registerMethod({ httpMethod: 'PATCH', path: realPath, options: realOptions }, { controller, methodName });
		}
	};
}

//
// Auth decorators
//

export function Inject(): Function {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

	};
}
