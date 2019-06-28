import { Asserter } from './test.asserter';

//
// Public classes
//

export class PlugTest {
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

export interface ITestClassArgs {
	testThisOnly?: boolean;
	dependsOn?: Function[];
}

export interface ITestMethodArgs {
	testThisOnly?: boolean;
}

export interface ITestClass {
	clazz: Function;
	name: string;
	testMethods: ITestMethod[];
	beforeTestMethods: ITestMethod[];
	afterTestMethods: ITestMethod[];
	testThisOnly?: boolean;
}

export interface ITestMethod {
	methodName: string;
	methodFunc: Function;
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

export type TTestClassItFunc = (clazz: ITestClass) => Promise<void>;
export type TTestMethodItFunc = (method: ITestMethod, clazz: ITestClass) => Promise<void>;

//
// Type checkers
//

export class TestTypeDetector {

	public static isTestMethodErrorToIgnore(error: any): error is ITestMethodErrorToIgnore {
		return error && error.ignoreTestError === true;
	}

}
