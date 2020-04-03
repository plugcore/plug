import { ClassParameter, ObjectUtils, Service, TypeChecker } from '@plugcore/core';
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

/**
 * Registers a basic auth login function that is going to be called in all
 * the routes that have basic security
 */
export function BasicAuthLogin(): Function {
	return function (target: any, propertyKey: string) {
		if (TypeChecker.isClass(target.constructor)) {
			RoutesUtils.registerBasicAuthLoginFn(target.constructor, propertyKey);
		}
	};
}

/**
 * Registers service method that will be called when a request
 * for JWT is performed
 */
export function JwtLogin(): Function {
	return function (target: any, propertyKey: string) {
		if (TypeChecker.isClass(target.constructor)) {
			RoutesUtils.registerJwtLoginFn(target.constructor, propertyKey);
		}
	};
}

/**
 * Registers service method that will be called on every route
 * with JWT security once the JWT payload verification
 * has already been defined. It can throw an error to
 * stop the request.
 */
export function JwtPreHandle(): Function {
	return function (target: any, propertyKey: string) {
		if (TypeChecker.isClass(target.constructor)) {
			RoutesUtils.registerJwtPreHandleFn(target.constructor, propertyKey);
		}
	};
}


/**
 * A custom auth function that is going to be executen in all routes that
 * have custom auth security
 */
export function CustomAuth(): Function {
	return function (target: any, propertyKey: string) {
		if (TypeChecker.isClass(target.constructor)) {
			RoutesUtils.registerCustomAuthFn(target.constructor, propertyKey);
		}
	};
}
