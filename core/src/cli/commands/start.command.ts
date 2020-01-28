import { isAbsolute, join } from 'path';
import { PorjectInitialization } from '../../project-init/project-init.util';
import { FsUtils } from '../../io/fs.utils';

/**
 * Command to start the server
 * @param args
 * @param base
 */
export default function start(args: string[], base: string) {

	(async () => {

		const distFolderArg = args[0] || join('dist', 'src');
		const configFolderArg = args[1] || 'configuration';
		let distFolder = isAbsolute(distFolderArg) ? distFolderArg : join(base, distFolderArg);
		const configurationFolder = isAbsolute(configFolderArg) ? configFolderArg : join(base, configFolderArg);
		if (!args[0] && !isAbsolute(distFolderArg)) {
			const exists = await FsUtils.fileOrFolderExists(distFolderArg);
			if (!exists.exists) {
				distFolder = join(base, 'dist');
			}
		}

		PorjectInitialization.start(distFolder, configurationFolder);

	})();


}
