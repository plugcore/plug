
import { isAbsolute, join } from 'path';
import { TestManager } from '../../test/test.manager';

/**
 * Command to start the server
 * @param args
 * @param base
 */
export default function test(args: string[], base: string) {

	const argFolder = args[0] || base;
	const argConfigFolder = args[1] || 'configuration';
	const testsFolder = isAbsolute(argFolder) ? argFolder : join(process.cwd(), argFolder);
	TestManager.executeTests(testsFolder, argConfigFolder).then();

}

