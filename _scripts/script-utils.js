const { exec } = require('child_process');
const { exists, mkdir, lstat, unlink, access, readdir, rmdir, copyFile, readFile, writeFile } = require('fs');
const { join } = require('path');

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
};

async function removeFolder(dir) {
	return new Promise((resolve, reject) => {
		if (dir === undefined || dir === null || dir === '/' || dir === '\\') {
			reject('Badk path: ' + dir);
		}
		access(dir, (error) => {
			if (error) {
				return reject(new Error(error));
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
};

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
	const jsonText = JSON.stringify(object);
	return saveStringAsFile(filePath, jsonText);
}

const consoleColors =  {
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
	printError
};