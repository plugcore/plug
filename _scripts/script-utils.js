const { exec } = require('child_process');
const { exists, mkdir, lstat, unlink, access, readdir, rmdir, copyFile, readFile, writeFile } = require('fs');
const { join } = require('path');
const readline = require('readline');

const packageJsonFileSuffix = 'file:';

async function buildProject(projectFolder, projectName) {

	// Var declarations
	const packageJsonFile = 'package.json';
	const packageJsonPath = join(projectFolder, packageJsonFile);
	const packageJson = await loadJsonFile(packageJsonPath);

	const infoPrefix = 'BUILD-' + packageJson.name + ': ';
	const publishFolderPath = 'publish';
	const distFolder = join(projectFolder, 'dist');
	const publishFolder = join(projectFolder, publishFolderPath);
	const distPackageJsonPath = join(projectFolder, publishFolderPath, packageJsonFile);
	const distSrcFolder = join(distFolder, 'src');
	const publishSrcFolder = join(publishFolder, 'src');
	const distTypesFolder = join(distFolder, 'types');
	const publishTypesFolder = join(publishFolder, 'types');
	const publishTestTypesFolder = join(publishFolder, 'types', 'test');
	const srcTypesDtsFile = join(projectFolder, 'index' + '.ts');
	const publishTypesDtsFile = join(publishFolder, 'types', 'index' + '.d.ts');
	const publishIndexDtsFolder = join(publishFolder, 'index' + '.d.ts');
	const srcIndexJsFile = join(distFolder, 'index.js');
	const publishIndexJsFile = join(publishFolder, 'index.js');
	const srcReadmeFile = join(projectFolder, 'README.md');
	const publishReadmeFile = join(publishFolder, 'README.md');

	// 1: Force a TSC
	// Done in package.json

	// 2: Clean or create publish folder
	printInfo(`${infoPrefix}Creating publish folder`);
	await emptyOrCreateFolder(publishFolder);

	// 3: copy packageJson
	printInfo(`${infoPrefix}Creating package.json`);
	packageJson.devDependencies = undefined;
	if (packageJson.dependencies) {
		for (const dependency of Object.keys(packageJson.dependencies)) {
			const dependencyLocation = packageJson.dependencies[dependency];
			if (dependencyLocation.startsWith(packageJsonFileSuffix)) {
				packageJson.dependencies[dependency] = [
					dependencyLocation.slice(0, packageJsonFileSuffix.length),
					'../',
					dependencyLocation.slice(packageJsonFileSuffix.length)
				].join('');
			}
		}
	}
	await saveObjectAsJsonFile(distPackageJsonPath, packageJson);

	// 4: Copy src
	printInfo(`${infoPrefix}Copying "${distSrcFolder}" folder to "${publishSrcFolder}"`);
	await copyFolder(distSrcFolder, publishSrcFolder);

	// 5: Copy types and remove tests
	printInfo(`${infoPrefix}Copying "${distTypesFolder}" folder to "${publishTypesFolder}"`);
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

	// 7: Copy README file for documentation
	printInfo(`${infoPrefix}Copying "${srcReadmeFile}" file to "${publishReadmeFile}"`);
	await copyOrReplaceFile(srcReadmeFile, publishReadmeFile);

	// Success
	printSuccess(`${infoPrefix}All tasks executed succesfully`);

}

async function execCmd(cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(error);
				reject();
			}
			console.log(stdout);
			console.log(stderr);
			resolve();
		});
	});
}

async function emptyOrCreateFolder(path) {
	return new Promise((resolve, reject) => {
		exists(path, folderExists => {

			if (folderExists) {
				readdir(path, (error, files) => {
					if (error) {
						return reject(new Error(error));
					}
					Promise.all(files.map((file) => {
						return removeFile(path, file);
					}))
						.then(() => { resolve(); })
						.catch(reject);
				});
			} else {
				createFolder(path).then(resolve).catch(reject);
			}

		});
	});
}

async function createFolder(path) {
	return new Promise((resolve, reject) => {
		exists(path, folderExists => {
			if (!folderExists) {
				mkdir(path, error => {
					if (error) {
						reject(new Error(error));
					} else {
						resolve();
					}
				});
			} else {
				resolve();
			}
		});
	});
}

async function removeFile(dir, file) {
	return new Promise((resolve, reject) => {
		var filePath = join(dir, file);
		lstat(filePath, (err, stats) => {
			if (err) {
				return reject(err);
			}
			if (stats.isDirectory()) {
				resolve(removeFolder(filePath));
			} else {
				unlink(filePath, (err) => {
					if (err) {
						return reject(err);
					}
					resolve();
				});
			}
		});
	});
}

async function removeFolder(dir, errorOnFolderNotFound) {
	return new Promise((resolve, reject) => {
		if (dir === undefined || dir === null || dir === '/' || dir === '\\') {
			reject('Badk path: ' + dir);
		}
		access(dir, (error) => {
			if (error) {
				if (errorOnFolderNotFound) {
					return reject(new Error(error));
				} else {
					return resolve();
				}
			}
			readdir(dir, (error, files) => {
				if (error) {
					return reject(new Error(error));
				}
				Promise.all(files.map((file) => {
					return removeFile(dir, file);
				})).then(() => {
					rmdir(dir, (error) => {
						if (error) {
							return reject(new Error(error));
						}
						resolve();
					});
				}).catch(reject);
			});
		});
	});
}

async function isFile(filePath) {
	return new Promise((resolve, reject) => {
		lstat(filePath, (error, stats) => {
			if (error) {
				reject(new Error(error));
			} else {
				resolve(stats.isFile());
			}
		});
	});
}

async function copyOrReplaceFile(src, dest) {
	return new Promise((resolve, reject) => {
		copyFile(src, dest, error => {
			if (error) {
				reject(new Error(error));
			} else {
				resolve();
			}
		});
	});
}

async function copyFolder(from, to) {
	return new Promise((resolve, reject) => {
		emptyOrCreateFolder(to).then(() => {

			readdir(from, (error, files) => {
				if (error) {
					reject(new Error(error));
				} else {
					resolve(Promise.all(files.map(async filePath => {
						const src = join(from, filePath);
						const dest = join(to, filePath);
						const elIsFile = await isFile(src);
						if (elIsFile) {
							await copyOrReplaceFile(src, dest);
						} else {
							await copyFolder(src, dest);
						}
					})));
				}
			});

		}).catch(reject);
	});
}

async function loadFileAsString(filePath) {
	return new Promise((resolve, reject) => {
		readFile(filePath, (error, data) => {
			if (error) {
				reject(new Error(error));
			} else {
				resolve(data.toString());
			}
		});
	});
}

async function loadJsonFile(filePath) {
	const jsonFile = await loadFileAsString(filePath);
	return JSON.parse(jsonFile);
}

async function saveStringAsFile(filePath, fileContent) {
	return new Promise((resolve, reject) => {
		writeFile(filePath, fileContent, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
}

async function saveObjectAsJsonFile(filePath, object) {
	const jsonText = JSON.stringify(object, null, '\t');
	return saveStringAsFile(filePath, jsonText);
}

const consoleColors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	fgBlack: '\x1b[30m',
	fgRed: '\x1b[31m',
	fgGreen: '\x1b[32m',
	fgYellow: '\x1b[33m',
	fgBlue: '\x1b[34m',
	fgMagenta: '\x1b[35m',
	fgCyan: '\x1b[36m',
	fgWhite: '\x1b[37m',

	bgBlack: '\x1b[40m',
	bgRed: '\x1b[41m',
	bgGreen: '\x1b[42m',
	bgYellow: '\x1b[43m',
	bgBlue: '\x1b[44m',
	bgMagenta: '\x1b[45m',
	bgCyan: '\x1b[46m',
	bgWhite: '\x1b[47m'
};

function printInfo(infoText) {
	console.log(`${consoleColors.fgCyan}${infoText}${consoleColors.reset}`);
}

function printSuccess(successText) {
	console.log(`${consoleColors.fgGreen}${successText}${consoleColors.reset}`);
}

function printError(errorText, error) {
	console.log(`${consoleColors.fgRed}${errorText}`, error, consoleColors.reset);
}

/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 * This function was born in http://stackoverflow.com/a/6832721.
 * Tests can be found in http://jsfiddle.net/pCX3V/
 * @copyright by Jon Papaioannou (["john", "papaioannou"].join(".") + "@gmail.com")
 * @license This function is in the public domain. Do what you want with it, no strings attached.
 */
function versionCompare(v1, v2, options) {
	var lexicographical = options && options.lexicographical,
		zeroExtend = options && options.zeroExtend,
		v1parts = v1.split('.'),
		v2parts = v2.split('.');

	function isValidPart(x) {
		return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
	}

	if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
		return NaN;
	}

	if (zeroExtend) {
		while (v1parts.length < v2parts.length) v1parts.push('0');
		while (v2parts.length < v1parts.length) v2parts.push('0');
	}

	if (!lexicographical) {
		v1parts = v1parts.map(Number);
		v2parts = v2parts.map(Number);
	}

	for (var i = 0; i < v1parts.length; ++i) {
		if (v2parts.length == i) {
			return 1;
		}

		if (v1parts[i] == v2parts[i]) {
			continue;
		}
		else if (v1parts[i] > v2parts[i]) {
			return 1;
		}
		else {
			return -1;
		}
	}

	if (v1parts.length != v2parts.length) {
		return -1;
	}

	return 0;
}

/**
 * Promts the user in the console using the first parameter
 * as a question and returns whatever the user writes.
 * The second parameter is optional, an is a configuration
 * string that can include a `%%` with the result from
 * the first question. If the user rejects the confirmation
 * it throws an error.
 * @param {*} question
 * @param {*} confirmationQuestion
 */
async function consolePromt(question, confirmationQuestion) {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		rl.question(question, function (response) {
			if (confirmationQuestion) {
				const secondQuestion = confirmationQuestion.replace('%%', response) + ' (y/yes): ';
				rl.question(secondQuestion, function (response2) {
					rl.close();
					if (response2 === 'y' || response2 === 'yes') {
						resolve(response);
					} else {
						reject('Operation canceled');
					}
				});
			} else {
				rl.close();
				resolve(response);
			}
		});
	});
}

module.exports = {
	execCmd,
	emptyOrCreateFolder,
	removeFolder,
	copyFolder,
	removeFile,
	isFile,
	copyOrReplaceFile,
	loadFileAsString,
	loadJsonFile,
	saveStringAsFile,
	saveObjectAsJsonFile,
	consoleColors,
	printInfo,
	printSuccess,
	printError,
	buildProject,
	versionCompare,
	consolePromt
};
