
import { join } from 'path';
import { FsUtils } from '../../io/fs.utils';

/**
 * Command to init a project
 * @param args
 * @param base
 */
export default function init(args: string[], base: string) {

	FsUtils.copyFolderRecursiveSync(join(__dirname + '/../templates/project-template'), base);
	FsUtils.renameFileOrFolderSync(base + '/project-template', args[0]);

}


