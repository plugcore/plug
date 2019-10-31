/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'reflect-metadata';
import { TestManager } from './test.manager';
import { ITestClassArgs, ITestMethodArgs } from './test.shared';

/**
 * Decorate the class that envelops a determinated set of tests in order
 * to be able to execute them
 */
export function TestClass(decoratorArgs: ITestClassArgs = {}): Function {
	return (target: Function) => {

		// Check if decorator has been used in a class
		if (typeof target === 'function') {
			TestManager.registerTestClass(target, decoratorArgs);
		}

	};

}

/**
 * Use this in any method inside a class decorated with `@TestClass()` to
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
 * Use this in any method inside a class decorated with `@TestClass()` to
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
 * Use this in any method inside a class decorated with `@TestClass()` to
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
