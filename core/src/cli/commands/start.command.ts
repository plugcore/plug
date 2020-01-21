import { isAbsolute, join } from 'path';
import { PorjectInitialization } from '../../project-init/project-init.util';

/**
 * Command to start the server
 * @param args
 * @param base
 */
export default function start(args: string[], base: string) {


	const distFolderArg = args[0] || join('dist', 'src');
	const configurationFolderArg = args[1];
	const distFolder = isAbsolute(distFolderArg) ? distFolderArg : join(base, distFolderArg);

	PorjectInitialization.start(distFolder, configurationFolderArg);

}
