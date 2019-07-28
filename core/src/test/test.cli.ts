import { isAbsolute, join } from 'path';
import { TestManager } from './test.manager';

// This class can be executed from command line to start the tests
// ex: node dist/test/test.cli.js test

const commandArguments = process.argv;
enum ETestArguments {
	test = 'test', // Executes all tests
	info = 'info' // Lists all tests
}

// By default there are always 2 arguments:
// - The location of node binary
// - Te location of the scrtip executed, ie: this file
if (commandArguments && commandArguments.length > 3) {
	// Coomand line arguments
	const args = commandArguments.slice(2);
	// Test folder
	const argFolder = args[1];
	const argConfigFolder = args[2];
	const testsFolder = isAbsolute(argFolder) ? argFolder : join(process.cwd(), argFolder);

	switch (args[0]) {
		case ETestArguments.info: TestManager.showTestsInfo(testsFolder).then(); break;
		case ETestArguments.test: TestManager.executeTests(testsFolder, argConfigFolder).then(); break;
		default: console.error('Invalid command'); break;
	}
} else if (commandArguments.length > 2) {
	console.error('Invalid command, missing test folder path');
} else {
	console.error('No command provided');
}
