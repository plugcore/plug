
import { CliUtils } from '../cli.utils';
import { FsUtils } from '../../io/fs.utils';
import { join } from 'path';
import { tsconfigjson } from '../templates/project-template/tsconfig.json';

/**
 * Command to init a project
 * @param args
 * @param base
 */
export default function init(args: string[], base: string) {

	// Package.json dependecies

	const dependecies = [
		'@plugcore/core',
	];
	const dependeciesWeb = [
		'@plugcore/web',
	];
	const dependeciesMongodb = [
		'@plugcore/ds-mongodb',
	];

	const devDependecies = [
		'@types/node',
		'@types/pino',
		'pino-pretty',
		'tsc-watch',
		'typescript'
	];
	/* const devDependeciesWeb = [
		'@plugcore/web',
	]; */
	const devDependeciesMongodb = [
		'@types/mongodb',
	];

	(async () => {

		// 1: Questions
		let installWeb = false;
		let installMongodb = false;
		let installDemo = false;
		const createDemo = await CliUtils.promt('Do you want to create a basic demo with API REST and a MongodDB client? (y/yes): ');
		if (createDemo === 'y' || createDemo === 'yes') {
			installWeb = true;
			installMongodb = true;
			installDemo = true;
		} else {
			const pInstallWeb = await CliUtils.promt('Do you want to install the API REST module? (y/yes): ');
			if (pInstallWeb === 'y' || pInstallWeb === 'yes') {
				installWeb = true;
			}
			const pInstallMongodb = await CliUtils.promt('Do you want to install the MongodDB client? (y/yes): ');
			if (pInstallMongodb === 'y' || pInstallMongodb === 'yes') {
				installMongodb = true;
			}
		}

		let depsToInstall = dependecies;
		if (installWeb) {
			depsToInstall = depsToInstall.concat(dependeciesWeb);
		}
		if (installMongodb) {
			depsToInstall = depsToInstall.concat(dependeciesMongodb);
		}
		let devDepsToInstall = devDependecies;
		if (installWeb) {
			/* devDepsToInstall = devDepsToInstall.concat(devDependeciesWeb); */
		}
		if (installMongodb) {
			devDepsToInstall = devDepsToInstall.concat(devDependeciesMongodb);
		}

		// 2: init npm project and install dependencies
		/* await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['init', '-y']);
		await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', '--save', ...depsToInstall]);
		await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', '--save-dev', ...devDepsToInstall]); */

		// 3: update package.json with the new scripts
		const jsonPath = join(base, 'package.json');
		const packageJson = await FsUtils.loadJsonFile<any>(jsonPath, { encoding: 'utf8' });
		packageJson.scripts = {
			'start': 'npx plug start',
			'test': 'npx tsc --incremental true && npm run test:clean',
			'test:dev': 'node node_modules/tsc-watch/lib/tsc-watch.js --noClear --onSuccess "npm run test:clean"',
			'test:clean': 'npx plug test | npx pino-pretty -t -i pid,hostname,name',
			'dev': 'node node_modules/tsc-watch/lib/tsc-watch.js --noClear --onSuccess "npm run start:dev"',
			'start:dev': 'npm run start | npx pino-pretty -t -i pid,hostname,name'
		};
		await FsUtils.saveFile(jsonPath, JSON.stringify(packageJson, null, 4));

		// 4: Copy tsconfig
		const targetTsconfigPath = join(base, 'tsconfig.json');
		await FsUtils.saveFile(targetTsconfigPath, tsconfigjson);

		// 5: create basic project structure


	})().then(() => {
		console.log('-----');
		console.log('Succesfully initialized the project');
		console.log('You can start it by executing:');
		console.log('> npm start');
		console.log('- or -');
		console.log('> npm run dev');
		console.log('-----');
	}, error => {
		console.log(error);
	});

}


