import { join, dirname } from 'path';
import { FsUtils } from '../io/fs.utils';
import { ObjectUtils } from '../utils/object.utils';
import { TypeChecker } from '../utils/type.checker';
import { DeepPartial } from '../utils/typescript.utils';
import { Configuration } from './configuration.interfaces';
import { defaultProjectConfiguration } from './configuration.default';

export class ConfigurationLoader {

	private static readonly defaultConfigurationFileName = 'configuration.json';
	private static readonly environmentVariableRegex = new RegExp(/\$\[(.*?)\]/g);
	private static readonly configurationFileRegex = new RegExp(/@\[import:(.*?)\]/g);

	//
	// Public methods
	//

	/**
	 * Calls to `ConfigurationLoader.loadFile` to load the application configuration which will
	 * usually be at `/configuration/condiguration.json`. It will use the defaults determined by
	 * `defaultProjectConviguration`
	 * @param folder
	 * @param environment
	 */
	public static async loadProject(
		folder: string, options?: { environment?: string; configurationFileName?: string }
	): Promise<Configuration> {

		const finalConfiguration = await this.loadFile<Configuration>(folder, options);

		return <Configuration>ObjectUtils.deepAssign(defaultProjectConfiguration, finalConfiguration);

	}

	/**
	 * Searches in a folder for a configuration.json to convert and return it as an object.
	 * The load supports:
	 *   - Environment files, ex: configuration.prod.json.
	 *      - In order to load it you can pass it as a parameter or with `NODE_ENV`
	 *   - External imports
	 *     - If you have some section of the file that is too big, you can create a different file and import it like:
	 *     - `{ "log": "@[import:logcfg.json]" }`
	 *   - Environment variables
	 *     - At any point you can have something like `{ "log": { "level" : "$[NODE_LOG_LEVEL]" } }`
	 *  It can throw errors.
	 * @param folder
	 * @param environment
	 */
	public static async loadFile<T>(
		folder: string, options?: { environment?: string; configurationFileName?: string }
	): Promise<DeepPartial<T>> {

		const finalOptions = Object.assign({
			configurationFileName: this.defaultConfigurationFileName
		}, options);

		// Validators
		await this.basicValidations(folder, finalOptions.configurationFileName);

		// Base configuration load
		const configurationFile = join(folder, this.defaultConfigurationFileName);
		const configurationPromises = [this.importConfigurationFile<T>(configurationFile)];

		// ENV configuration file
		const currEnv = finalOptions.environment || process.env.NODE_ENV;
		if (currEnv !== undefined && currEnv !== null) {
			const dotIndex = this.defaultConfigurationFileName.lastIndexOf('.');
			const configurationEnvFile = join(folder,
				this.defaultConfigurationFileName.substr(0, dotIndex) + `.${currEnv}` +
				this.defaultConfigurationFileName.substr(dotIndex  )
			);
			const envFileExists = (await FsUtils.fileOrFolderExists(configurationEnvFile));
			if (envFileExists.exists) {
				configurationPromises.push(
					this.importConfigurationFile<T>(configurationEnvFile)
				);
			}
		}

		// Configuration load
		const configurations = await Promise.all(configurationPromises);

		// Merge files and return
		const finalConfiguration = configurations.length > 1 ?
			ObjectUtils.deepAssign(configurations[0], configurations[1]) : configurations[0];

		return finalConfiguration;

	}

	//
	// Private methods
	//

	/**
	 * Performs basic validations before commiting to load the configuration file.
	 * All validation errors are thrown.
	 */
	private static async basicValidations(folder: string, configurationFileName: string) {

		const folderExists = await FsUtils.fileOrFolderExists(folder);
		if (!folderExists.exists) {
			throw new Error(`Error while looking for configuration folder: "${folder}". Folder not found or without permissions`);
		}

		const filePath = join(folder, configurationFileName);
		const fileExists = await FsUtils.fileOrFolderExists(filePath);
		if (!fileExists.exists) {
			throw new Error(`Error while looking for configuration file: "${filePath}". File not found or without permissions`);
		}

	}

	/**
	 * Loads the configuration file, processes envirnoment variable and file imports, an then
	 * returns it as a valid object
	 */
	private static async importConfigurationFile<T>(file: string): Promise<DeepPartial<T>> {

		const fileDirectory = dirname(file);
		const fileContent = JSON.parse(await FsUtils.loadFile(file));

		for (const objEntry of ObjectUtils.walkThroughObject(fileContent)) {
			if (TypeChecker.isString(objEntry.value)) {

				const matchEnvironment = objEntry.value.match(this.environmentVariableRegex);
				if (matchEnvironment && matchEnvironment.length === 1) {

					// Environment variable
					const envVarName = matchEnvironment[0];
					const enVarValue = process.env[envVarName.substring(0, envVarName.length - 1).substring(2)];
					if (enVarValue) {

						objEntry.objRef[objEntry.key] = enVarValue;
					} else {
						throw new Error('Environment variable not found while loading configuration:' + envVarName);
					}

				} else {

					const matchImport = objEntry.value.match(this.configurationFileRegex);
					if (matchImport && matchImport.length === 1) {

						// Configuration import
						const fileName = matchImport[0];
						const importFilePath = join(fileDirectory, fileName.substring(0, fileName.length -1).substring(9));
						const importedConfiguration = await this.importConfigurationFile(importFilePath);
						objEntry.objRef[objEntry.key] = importedConfiguration;

					}
				}


			}
		}

		return fileContent;

	}

}
