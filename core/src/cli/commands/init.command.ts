
import { CliUtils } from '../cli.utils';
import { FsUtils } from '../../io/fs.utils';
import { join } from 'path';
import { tsconfigjsonTemplate } from '../templates/project-template/tsconfig-json.template';
import { customConfigurationTemplate } from '../templates/project-template/custom-configuration.template';
import { exampleApiTemplate } from '../templates/project-template/example-api.template';
import { exampleControllerTemplate } from '../templates/project-template/example-controller.template';
import { exampleServiceTemplate } from '../templates/project-template/example-service.template';
import { exampleSharedTemplate } from '../templates/project-template/example-shared.template';
import { exampleServiceTestTemplate } from '../templates/project-template/example-service-test.template';
import { gitIgnoreTemaplte } from '../templates/project-template/gitignore.template';
import { editorConfigTemplate } from '../templates/project-template/editorconfig.template';

/**
 * Command to init a project
 * @param args
 * @param base
 */
export default function init(args: string[], base: string) {

	// Package.json dependecies

	const accetableResponses = ['y', 'yes', 'Y', 'Yes', 'YES'];

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

	const defaultConfiguration: any = {
		log: { level: 'debug' },
		custom: { example: 'Example configuration property' }
	};
	const proConfiguration: any = {
		log: { level: 'info' }
	};

	(async () => {

		// 1: Questions
		let installWeb = false;
		let installMongodb = false;
		let installDemo = false;
		let installNedb = false;
		const createDemo = await CliUtils.promt('Do you want to create a basic demo with the "web" and "ds-mongodb" modules? (Y/n): ');
		if (accetableResponses.includes(createDemo)) {
			installWeb = true;
			installMongodb = true;
			installDemo = true;
			const installInMem = await CliUtils.promt(
				'Do you want to use an in memory database mocked as MongoDB for development or tests purposes? (Y/n): '
			);
			if (accetableResponses.includes(installInMem)) {
				installNedb = true;
			}
		} else {
			const pInstallWeb = await CliUtils.promt('Do you want to install the "web" module? (Y/n): ');
			if (accetableResponses.includes(pInstallWeb)) {
				installWeb = true;
			}
			const pInstallMongodb = await CliUtils.promt('Do you want to install the "ds-mongodb" module? (Y/n): ');
			if (accetableResponses.includes(pInstallMongodb)) {
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
		if (installNedb) {
			devDepsToInstall = devDepsToInstall.concat(['nedb']);
		}

		// 2: init npm project and install dependencies
		await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['init', '-y']);
		await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', '--save', ...depsToInstall]);
		await CliUtils.executeCommand(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['i', '--save-dev', ...devDepsToInstall]);

		// 3: update package.json with the new scripts
		const jsonPath = join(base, 'package.json');
		const packageJson = await FsUtils.loadJsonFile<any>(jsonPath, { encoding: 'utf8' });
		packageJson.scripts = {
			'start': 'npx tsc --incremental true && npx plug start',
			'test': 'npx tsc --incremental true && npm run start:test',
			'test:dev': 'node node_modules/tsc-watch/lib/tsc-watch.js --noClear --onSuccess "npm run start:test"',
			'start:test': 'npx plug test | npx pino-pretty -t -i pid,hostname,name',
			'dev': 'node node_modules/tsc-watch/lib/tsc-watch.js --noClear --onSuccess "npm run start:dev"',
			'start:dev': 'npx plug start | npx pino-pretty -t -i pid,hostname,name'
		};

		const tsConfigWithDeps = tsconfigjsonTemplate.replace('<<<>>>', `"${depsToInstall.join('", "')}"`);

		await Promise.all([
			FsUtils.saveFile(jsonPath, JSON.stringify(packageJson, null, '\t')),
			// 4: Create tsconfig and gitignore
			FsUtils.saveFile(join(base, 'tsconfig.json'), tsConfigWithDeps),
			FsUtils.saveFile(join(base, '.gitignore'), gitIgnoreTemaplte),
			FsUtils.saveFile(join(base, '.editorconfig'), editorConfigTemplate),
			// 5: create basic project structure
			FsUtils.createFolder(join(base, 'src')),
			FsUtils.createFolder(join(base, 'test'))
		]);

		// 6: create demo files
		if (installDemo) {
			const srcPath = join(base, 'src', 'example');
			const testPath = join(base, 'test', 'example');
			await Promise.all([
				FsUtils.createFolder(srcPath),
				FsUtils.createFolder(testPath)
			]);
			await Promise.all([
				FsUtils.saveFile(join(srcPath, 'example.api.ts'), exampleApiTemplate),
				FsUtils.saveFile(join(srcPath, 'example.controller.ts'), exampleControllerTemplate),
				FsUtils.saveFile(join(srcPath, 'example.service.ts'), exampleServiceTemplate),
				FsUtils.saveFile(join(srcPath, 'example.shared.ts'), exampleSharedTemplate),
				FsUtils.saveFile(join(testPath, 'example-service.test.ts'), exampleServiceTestTemplate)
			]);
		}

		// 7: create configuration
		if (installMongodb) {
			defaultConfiguration.connections = {
				'mymongodb': {
					'type': 'mongodb',
					'url': 'mongodb://myuser:mypassword@mongodb0.example.com:27017/admin',
					'databaseName': 'mydatabase'
				}
			};
			proConfiguration.connections = {
				'mymongodb': {
					'type': 'mongodb',
					'url': 'mongodb://myuser:mypassword@mongodb0.example.com:27017/admin',
					'databaseName': 'mydatabase'
				}
			};
		}
		if (installWeb) {
			defaultConfiguration.web = {
				'server': {
					'port': 3000,
					'host': 'localhost'
				},
				'oas': {
					'enableDocumentation': true,
					'documentationPath': '/api/documentation'
				}
			};
			proConfiguration.web = {
				'server': {
					'port': 3000,
					'host': 'localhost'
				},
				'oas': {
					'enableDocumentation': false
				}
			};
		}
		if (installNedb) {
			defaultConfiguration.connections.mymongodb.url = 'nedb';
		}
		await Promise.all([
			FsUtils.createFolder(join(base, 'src', 'configuration')),
			FsUtils.createFolder(join(base, 'configuration'))
		]);
		await Promise.all([
			FsUtils.saveFile(
				join(base, 'src', 'configuration', 'custom.configuration.ts'),
				customConfigurationTemplate
			),
			FsUtils.saveFile(
				join(base, 'configuration', 'configuration.json'),
				JSON.stringify(defaultConfiguration, null, '\t')
			),
			FsUtils.saveFile(
				join(base, 'configuration', 'configuration.pro.json'),
				JSON.stringify(proConfiguration, null, '\t')
			)
		]);

	})().then(() => {
		console.log('-----');
		console.log('Succesfully initialized the project');
		console.log('-----');
		console.log('You can start it by executing:');
		console.log('> npm start');
		console.log('- or -');
		console.log('> npm run dev');
		console.log('-----');
	}, error => {
		console.log(error);
	});

}


