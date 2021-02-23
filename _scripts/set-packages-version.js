const { consolePromt, printError, versionCompare, loadJsonFile, saveObjectAsJsonFile, consoleColors } = require('./script-utils');
const { join } = require('path');

async function setPackagesVersion() {
	const commandArguments = process.argv;
	const force = commandArguments[2] && commandArguments[2] === 'force';
	const same = commandArguments[3] && commandArguments[3] === 'same';

	// Var declarations
	const corePackageJsonPath = join(__dirname, '..', 'core', 'package.json');
	const corePublishPackageJsonPath = join(__dirname, '..', 'core', 'publish', 'package.json');
	const webPackageJsonPath = join(__dirname, '..', 'web', 'package.json');
	const webPublishPackageJsonPath = join(__dirname, '..', 'web', 'publish', 'package.json');
	const dataPackageJsonPath = join(__dirname, '..', 'ds-mongodb', 'package.json');
	const dataPublishPackageJsonPath = join(__dirname, '..', 'ds-mongodb', 'publish', 'package.json');
	const emailPackageJsonPath = join(__dirname, '..', 'ds-email', 'package.json');
	const emailPublishPackageJsonPath = join(__dirname, '..', 'ds-email', 'publish', 'package.json');
	const mainPackageJsonPath = join(__dirname, '..', 'package.json');

	const corePackageJson = await loadJsonFile(corePackageJsonPath);
	const currentVersion = corePackageJson.version;
	const newVersion = same ? currentVersion : await consolePromt(
		`Current version is ${consoleColors.fgYellow}${currentVersion}${consoleColors.reset}, set the new version: \n`,
		`Are you sure yo want to change version from ${consoleColors.fgYellow}${currentVersion}${consoleColors.reset} ` +
		`to ${consoleColors.fgGreen}%%${consoleColors.reset}?`);

	if (force || versionCompare(currentVersion, newVersion) < 0) {

		// Version update
		const corePublishPackageJson = await loadJsonFile(corePublishPackageJsonPath);
		const webPackageJson = await loadJsonFile(webPackageJsonPath);
		const webPublishPackageJson = await loadJsonFile(webPublishPackageJsonPath);
		const dataPackageJson = await loadJsonFile(dataPackageJsonPath);
		const dataPublishPackageJson = await loadJsonFile(dataPublishPackageJsonPath);
		const emailPackageJson = await loadJsonFile(emailPackageJsonPath);
		const emailPublishPackageJson = await loadJsonFile(emailPublishPackageJsonPath);
		const mainPackageJson = await loadJsonFile(mainPackageJsonPath);

		corePackageJson.version = newVersion;
		corePublishPackageJson.version = newVersion;
		webPackageJson.version = newVersion;
		webPublishPackageJson.version = newVersion;
		dataPackageJson.version = newVersion;
		dataPublishPackageJson.version = newVersion;
		emailPackageJson.version = newVersion;
		emailPublishPackageJson.version = newVersion;
		mainPackageJson.version = newVersion;

		// Published versions must be without file:...
		webPublishPackageJson.dependencies['@plugcore/core'] = newVersion;
		dataPublishPackageJson.dependencies['@plugcore/core'] = newVersion;
		emailPublishPackageJson.dependencies['@plugcore/core'] = newVersion;

		// JSON files updates
		await Promise.all([
			saveObjectAsJsonFile(corePackageJsonPath, corePackageJson),
			saveObjectAsJsonFile(corePublishPackageJsonPath, corePublishPackageJson),
			saveObjectAsJsonFile(webPackageJsonPath, webPackageJson),
			saveObjectAsJsonFile(webPublishPackageJsonPath, webPublishPackageJson),
			saveObjectAsJsonFile(dataPackageJsonPath, dataPackageJson),
			saveObjectAsJsonFile(dataPublishPackageJsonPath, dataPublishPackageJson),
			saveObjectAsJsonFile(emailPackageJsonPath, emailPackageJson),
			saveObjectAsJsonFile(emailPublishPackageJsonPath, emailPublishPackageJson),
			saveObjectAsJsonFile(mainPackageJsonPath, mainPackageJson)
		]);

	} else {
		throw new Error(`Version ${newVersion} is not greater than ${currentVersion}`);
	}

}

// Execution boilerplate
(async () => {
	try {
		await setPackagesVersion();
	} catch (error) {
		printError('Error while setting new version for packages:', error);
		process.exit(2);
	}
})();


