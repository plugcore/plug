import 'reflect-metadata';
import { TestManager } from './test.manager';
import { ITestClassArgs, ITestMethodArgs } from './test.shared';

export function TestClass(decoratorArgs: ITestClassArgs = {}): Function {
	return (target: Function) => {

		// Check if decorator has been used in a class
		if (typeof target === 'function') {
			TestManager.registerTestClass(target, decoratorArgs);
		}

	};

}

export function Test(decoratorArgs: ITestMethodArgs = {}): Function {
	return (object: Object, propertyKey: string, descriptor: PropertyDescriptor) => {

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
