import { Asserter } from './test.asserter';
import { ClassParameter } from '../utils/typescript.utils';

//
// Public classes
//

export class AsserterService {
	protected assert: Asserter;
}

//
// Public interfaces
//

export interface IAssertOptions {
	stopOnError?: boolean;
	message?: string;
}

//
// Interal implementation Interfaces
//

export interface ITestServiceArgs {
	testThisOnly?: boolean;
	/**
	 * If you want to import datasources the same way you do with
	 * services you can use a connection
	 */
	connection?: string;
}

export interface ITestMethodArgs {
	testThisOnly?: boolean;
}

export interface ITestService {
	clazz: ClassParameter<any>;
	name: string;
	testMethods: ITestMethod[];
	beforeTestMethods: ITestMethod[];
	afterTestMethods: ITestMethod[];
	testThisOnly?: boolean;
}

export interface ITestMethod {
	methodName: string;
	methodFunc: (...args: any) => any;
	testThisOnly?: boolean;
}

export interface ITestStats {
	className: string;
	success: boolean;
	unexpectedError: boolean;
	methods: ITestMethodStats[];
}

export interface ITestMethodStats {
	methodName: string;
	success: boolean;
	successAsserts: number;
	errorAsserts: number;
	unexpectedError: boolean;
}

export interface ITestMethodErrorToIgnore {
	ignoreTestError: boolean;
}

//
// Types
//

export type TTestServiceItFunc = (clazz: ITestService) => Promise<void>;
export type TTestMethodItFunc = (method: ITestMethod, clazz: ITestService) => Promise<void>;

//
// Type checkers
//

export class TestTypeDetector {

	public static isTestMethodErrorToIgnore(error: any): error is ITestMethodErrorToIgnore {
		return error && error.ignoreTestError === true;
	}

}
