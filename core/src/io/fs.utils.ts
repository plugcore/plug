import { F_OK } from 'constants';
import { access, lstat, readdir, readFile, rmdir, stat, Stats, unlink, write, writeFile, mkdir, rename, createReadStream, PathLike } from 'fs';
import { join, basename, resolve } from 'path';
import { StringConstants } from '../constants/string.constants';
import { TypeChecker } from '../utils/type.checker';

export interface IFileStats {
	path: string;
	stats: Stats;
}

/**
 * File System utils
 */
export class FsUtils {

	/**
	 * Returns a list with all the files inside that folder, it can search
	 * recursively
	 * @param folderPath
	 * @param recursive
	 * @param resultFiles
	 */
	public static async getAllFilesFromFolder(folderPath: string, recursive?: boolean, resultFiles?: string[]) {

		const folderFiles = await this.getFolderFiles(folderPath);

		if (folderFiles && folderFiles.length > 0) {

			const filesStats = await Promise.all(this.getFilesStats(folderPath, folderFiles));
			for (const fileStats of filesStats) {
				if (fileStats.stats.isFile()) {
					resultFiles = resultFiles || [];
					resultFiles.push(fileStats.path);
				} else if (fileStats.stats.isDirectory() && recursive) {
					resultFiles = await this.getAllFilesFromFolder(fileStats.path, recursive, resultFiles);
				}
			}

		}

		return resultFiles || [];
	}

	/**
	 * Converts a list of file paths to the stats
	 * @param folderFiles
	 */
	public static getFilesStats(baseFolder: string, folderFiles: string[]): Promise<IFileStats>[] {

		const result: Promise<IFileStats>[] = [];
		for (const folderFile of folderFiles) {
			result.push(new Promise<IFileStats>((resolve) => {
				const realPath = join(baseFolder, folderFile);
				resolve(this.getStats(realPath).then(stats => {
					return <IFileStats>{
						path: realPath,
						stats
					};
				}));
			}));
		}
		return result;
	}

	/**
	 * Promise wrapper to readdir
	 * @param folderPath
	 */
	public static async getFolderFiles(folderPath: string) {
		return new Promise<string[]>((resolve, reject) => {
			readdir(folderPath, (err, folderFiles) => {
				if (err) {
					reject(err);
				} else {
					resolve(folderFiles);
				}
			});
		});
	}

	/**
	 * Promise wrapper to getStats
	 * @param filePath
	 */
	public static async getStats(filePath: string) {
		return new Promise<Stats>((resolve, reject) => {
			stat(filePath, (err, fileStat) => {
				if (err) {
					reject(err);
				} else {
					resolve(fileStat);
				}
			});
		});
	}

	/**
	 * Promise wrapper to readFile
	 * @param filePath
	 */
	public static async loadFile(filePath: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			readFile(filePath, StringConstants.UTF_8, (err, file) => {
				if (err) {
					reject(err);
				} else {
					resolve(file);
				}
			});
		});
	}

	/**
	 * Promise wrapper to write on specified
	 * @param fileDescriptor
	 * @param message
	 * @param offset
	 */
	public static async writeToFile(fileDescriptor: number, message: string, offset: number) {

		return new Promise((resolve, reject) => {

			write(fileDescriptor, message, offset, (err) => {
				if (err) {
					reject('Error writing on file');
				}
				resolve('');
			});
		});
	}

	/**
	 * Create of updates the file with the string content
	 * @param fileDescriptor
	 * @param message
	 * @param offset
	 */
	public static async saveFile(filePath: string, fileContent: string) {

		return new Promise((resolve, reject) => {

			writeFile(filePath, fileContent, (err) => {
				if (err) {
					reject('Error saving file');
				}
				resolve();
			});

		});
	}

	/**
	 * Recursively creates a folder structure, as many levels
	 * as needed
	 * @param folderPath
	 */
	public static async createFolder(folderPath: string) {

		const folderExists = await this.fileOrFolderExists(folderPath);
		if (folderExists.exists) {
			return;
		}

		const parent = resolve(folderPath, '..');
		await this.createFolder(parent);

		return new Promise((resolve, reject) => {
			mkdir(folderPath, error => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});

	}

	/**
	 * Copy a folder with its content
	 * @param source
	 * @param target
	 */
	public static copyFolderRecursiveSync(source: string, target: string) {
		const fs = require('fs');
		const path = require('path');
		let files = [];
		const targetFolder = path.join(target, path.basename(source));
		if (!fs.existsSync(targetFolder)) {
			fs.mkdirSync(targetFolder);
			if (fs.lstatSync(source).isDirectory()) {
				files = fs.readdirSync(source);
				files.forEach((file: any) => {
					const curSource = path.join(source, file);
					if (fs.lstatSync(curSource).isDirectory()) {
						FsUtils.copyFolderRecursiveSync(curSource, targetFolder);
					} else {
						FsUtils.copyFileSync(curSource, targetFolder);
					}
				});
			}
		} else {
			console.log('Already exists folder with this name');
		}
	}

	/**
	 * Copy a file
	 * @param source
	 * @param target
	 */
	public static copyFileSync(source: string, target: string) {
		const fs = require('fs');
		const path = require('path');
		let targetFile = target;
		if (fs.existsSync(target)) {
			if (fs.lstatSync(target).isDirectory()) {
				targetFile = path.join(target, path.basename(source));
			}
		}
		fs.writeFileSync(targetFile, fs.readFileSync(source));
	}

	/**
	 * Copy a file async
	 * @param source
	 * @param target
	 */
	public static async copyFile(source: string, target: string) {
		const existsSource = await this.fileOrFolderExists(source);
		if (!existsSource.exists) {
			throw new Error('Source doesn\'t exists ' + source);
		}
		const targetStats = await this.getStats(target);
		if (targetStats.isDirectory()) {
			throw new Error('Target is not a directory ' + source);
		}
		const targetFile = join(target, basename(source));
		return new Promise((resolve, reject) => {
			readFile(source, (err, file) => {
				if (err) {
					reject(err);
				} else {
					console.log({ targetFile, file });
					writeFile(targetFile, file, err2 => {
						if (err) {
							reject(err2);
						} else {
							resolve();
						}
					});
				}
			});
		});
	}

	/**
	 * Rename a file or a folder
	 * @param source
	 * @param name
	 */
	public static renameFileOrFolderSync(source: string, name: string) {
		const fs = require('fs');
		fs.renameSync(source, source + '/../' + name);
	}

	public static removeDir(path: any, callback: any): any {

		readdir(path, (err, files) => {
			if (err) {
				// Pass the error on to callback
				callback(err, []);
				return;
			}
			const wait = files.length;
			let count = 0;
			const folderDone = (errFd?: any) => {
				count++;
				// If we cleaned out all the files, continue
				if (count >= wait || errFd) {
					rmdir(path, callback);
				}
			};
			// Empty directory to bail early
			if (!wait) {
				folderDone();
				return;
			}

			// Remove one or more trailing slash to keep from doubling up
			path = path.replace(/\/+$/, '');
			files.forEach((file) => {
				const curPath = path + '/' + file;
				lstat(curPath, (errls, stats) => {
					if (errls) {
						callback(errls, []);
						return;
					}
					if (stats.isDirectory()) {
						FsUtils.removeDir(curPath, folderDone);
					} else {
						unlink(curPath, folderDone);
					}
				});
			});
		});
	}

	public static isJsFile(filePath: string): boolean {
		return /.*.js$/.test(filePath);
	}

	/**
	 * Loads all the javascript files inside the folder and
	 * returns an array with all the exports from each file
	 * @param folderPath
	 */
	public static async loadJsFolder(folderPath: string, recursive?: boolean): Promise<any[]> {

		const jsImports: Promise<void>[] = [];
		const folderFiles = await FsUtils.getAllFilesFromFolder(folderPath, recursive);

		folderFiles.forEach(file => {
			if (FsUtils.isJsFile(file)) {
				jsImports.push(import(file.replace(/\\/g, '/')));
			}
		});

		return await Promise.all(jsImports);
	}

	/**
	 * Check if the folder exists and you have permissions over it. It doesn't throw an error
	 * but returns it instead.
	 * @param folderPath
	 */
	public static async fileOrFolderExists(folderPath: string): Promise<{ exists: boolean; error?: Error }> {
		return new Promise(resolve => {

			access(folderPath, F_OK, (error) => {
				if (error) {
					resolve({ exists: false, error });
				} else {
					resolve({ exists: true });
				}
			});

		});
	}

	/**
	 * Tries to load the file path contents as JSON, can throw exceptions
	 * @param filePath
	 */
	public static async loadJsonFile<T>(filePath: string, options?: { encoding?: string; flag?: string }) {

		return new Promise<T>((resolve, reject) => {

			readFile(filePath, options || { encoding: 'utf-8' }, (err, data) => {
				if (err) {
					reject(err);
				} else {
					const content = TypeChecker.isBuffer(data) ? data.toString() : data;
					try {
						resolve(JSON.parse(content));
					} catch (error) {
						reject(error);
					}
				}
			});

		});

	}

	public static async removeFile(filePath: string, ignoreError?: boolean) {
		return new Promise((resolve, reject) => {
			unlink(filePath, error => {
				if (error && !ignoreError) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}

	public static moveFile(sourceFile: string, targetFile: string) {
		return new Promise((resolve, reject) => {
			rename(sourceFile, targetFile, error => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}

	public static createReadStream(file: PathLike, options?: string | {
		flags?: string;
		encoding?: string;
		fd?: number;
		mode?: number;
		autoClose?: boolean;
		start?: number;
		end?: number;
		highWaterMark?: number;
	}) {
		return createReadStream(file, options);
	}

}
