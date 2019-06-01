import { Asserter } from './test.asserter';

//
// Public classes
//

export class PlugTest {
	protected assert: Asserter;
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

//
// Types
//

export type TTestClassItFunc = (clazz: ITestClass) => Promise<void>;
export type TTestMethodItFunc = (method: ITestMethod, clazz: ITestClass) => Promise<void>;
