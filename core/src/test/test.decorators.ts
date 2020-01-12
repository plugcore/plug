import 'reflect-metadata';
import { TestManager } from './test.manager';
import { ITestServiceArgs, ITestMethodArgs } from './test.shared';
import { Service } from '../dependecy-injection/di.decorators';
import { TypeChecker } from '../utils/type.checker';

/**
 * Decorate the class that envelops a determinated set of tests in order
 * to be able to execute them
 */
export function TestService(decoratorArgs: ITestServiceArgs = {}): Function {
	return (target: Function) => {

		// Check if decorator has been used in a class
		if (TypeChecker.isClass(target)) {
			Service()(target);
			TestManager.registerTestService(target, decoratorArgs);
		}

	};

}

/**
 * Use this in any method inside a class decorated with `@TestService()` to
 * execute it while testing. It can by an async or normal function.
 */
export function Test(decoratorArgs: ITestMethodArgs = {}): Function {
	return (object: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

		// Check if decorator has been used in a method
		if (
			typeof object === 'object' &&
			typeof propertyKey === 'string' &&
			descriptor && typeof descriptor.value === 'function'
		) {
			TestManager.registerTestMethod(object.constructor.name, propertyKey, descriptor.value, decoratorArgs);
		}

	};

}

/**
 * Use this in any method inside a class decorated with `@TestService()` to
 * execute it before any tests are performed inside this class.
 * It can by an async or normal function.
 */
export function BeforeTests(): Function {
	return (object: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

		// Check if decorator has been used in a method
		if (
			typeof object === 'object' &&
			typeof propertyKey === 'string' &&
			descriptor && typeof descriptor.value === 'function'
		) {
			TestManager.registerBeforeTestMethod(object.constructor.name, propertyKey, descriptor.value);
		}

	};

}

/**
 * Use this in any method inside a class decorated with `@TestService()` to
 * execute it after all tests are performed inside this class.
 * It can by an async or normal function.
 */
export function AfterTests(): Function {
	return (object: Record<string, any>, propertyKey: string, descriptor: PropertyDescriptor) => {

		// Check if decorator has been used in a method
		if (
			typeof object === 'object' &&
			typeof propertyKey === 'string' &&
			descriptor && typeof descriptor.value === 'function'
		) {
			TestManager.registerAfterTestMethod(object.constructor.name, propertyKey, descriptor.value);
		}

	};

}
