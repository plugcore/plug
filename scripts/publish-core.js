const {
	execCmd, emptyOrCreateFolder, loadJsonFile, copyFolder,
	removeFolder, copyOrReplaceFile, saveStringAsFile,
	saveObjectAsJsonFile, printInfo, printSuccess, printError
} = require('./script-utils');
const { join } = require('path');

async function publishCore() {

	// Var declarations
	const infoPrefix = 'PUBLISH-CORE: ';
	const packageJsonFile = 'package.json';
	const publishFolderPath = 'publish';
	const coreFolder = join(__dirname, '..', 'core');
	const distFolder = join(coreFolder, 'dist');
	const publishFolder = join(coreFolder, publishFolderPath);
	const packageJsonPath = join(coreFolder, packageJsonFile);
	const distPackageJsonPath = join(coreFolder, publishFolderPath, packageJsonFile);
	const distSrcFolder = join(distFolder, 'src');
	const publishSrcFolder = join(publishFolder, 'src');
	const distTypesFolder = join(distFolder, 'types');
	const publishTypesFolder = join(publishFolder, 'types');
	const publishTestTypesFolder = join(publishFolder, 'types', 'test');
	const srcTypesDtsFile = join(coreFolder, 'index.ts');
	const publishTypesDtsFile = join(publishFolder, 'types', 'index.d.ts');
	const publishIndexDtsFolder = join(publishFolder, 'index.d.ts');
	const srcIndexJsFile = join(distFolder, 'index.js');
	const publishIndexJsFile = join(publishFolder, 'index.js');

	// 1: Force a TSC
	printInfo(`${infoPrefix} Executing typescript compiler`);
	await execCmd('cd core & npm run build');

	// 2: Clean or create publish folder
	printInfo(`${infoPrefix}Creating publish folder`);
	await emptyOrCreateFolder(publishFolder);

	// 3: copy packageJson
	printInfo(`${infoPrefix}Creating package.json`);
	const packageJson = await loadJsonFile(packageJsonPath);
	packageJson.devDependencies = undefined;
	await saveObjectAsJsonFile(distPackageJsonPath, packageJson);

	// 4: Copy src
	printInfo(`${infoPrefix}Copying "${distSrcFolder}" folder to "${publishSrcFolder}"`);
	await copyFolder(distSrcFolder, publishSrcFolder);

	// 5: Copy types and remove tests
	printInfo(`${infoPrefix}Copying "${distSrcFolder}" folder to "${publishSrcFolder}"`);
	await copyFolder(distTypesFolder, publishTypesFolder);
	printInfo(`${infoPrefix}Removing "${publishTestTypesFolder}" folder`);
	await removeFolder(publishTestTypesFolder);

	// 6: Create link for types
	printInfo(`${infoPrefix}Copying "${srcTypesDtsFile}" file to "${publishTypesDtsFile}`);
	await copyOrReplaceFile(srcTypesDtsFile, publishTypesDtsFile);
	printInfo(`${infoPrefix}Creating "${publishIndexDtsFolder}" file`);
	await saveStringAsFile(publishIndexDtsFolder, 'export * from \'./types\';');

	// 7: Copy index js file for js initialization
	printInfo(`${infoPrefix}Copying "${srcIndexJsFile}" file to "${publishIndexJsFile}"`);
	await copyOrReplaceFile(srcIndexJsFile, publishIndexJsFile);

	// Finally run npm publish, must be logged
	await execCmd('cd core/publish & npm publish');
	printSuccess(`${infoPrefix}All tasks executed succesfully`);

}

// Execution boilerplate
(async () => {
	try {
		await publishCore();
	} catch (error) {
		printError('Error on Core publish', error);
	}
})();

