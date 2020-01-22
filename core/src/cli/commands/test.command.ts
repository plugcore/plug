
import { isAbsolute, join } from 'path';
import { TestManager } from '../../test/test.manager';

/**
 * Command to start the server
 * @param args
 * @param base
 */
export default function test(args: string[], base: string) {

	const argFolder = args[0];
	const argConfigFolder = args[1] || join(base, 'configuration');
	const testsFolder = argFolder ?
		isAbsolute(argFolder) ?
			argFolder :
			join(base, argFolder) :
		join(base, 'dist', 'test');
	TestManager.executeTests(testsFolder, argConfigFolder).then();

}

