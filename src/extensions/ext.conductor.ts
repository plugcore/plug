import { join } from 'path';
import { Service } from '../dependecy-injection/di.decorators';
import { DiUtils } from '../dependecy-injection/di.utils';
import { Logger } from '../logs/logger.utils';
import { ExtConfiguration } from './configuration/ext-configuration.interface';
import { ExtsConfigurationChecker } from './configuration/exts-configuration.checker';
import { ExtCtxGenerator } from './ext-ctx.generator';

@Service()
export class ExtConductor {

	constructor(
		private extCfgChecker: ExtsConfigurationChecker,
		private logger: Logger
	) { }

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	public async scan() {

		const extToLoad: Promise<void>[] = [];

		this.extCfgChecker.scannedExts.forEach(ext => {
			extToLoad.push(
				this.scanExt(ext)
			);
		});

		// Async load one by one

		return this.loadExts(extToLoad).then(() => {

			// Finally we can resolve the promise
			this.logger.info('All extensiones loaded');

		});

	}

	// -------------------------------------------------------------------------
	// Private methods
	// -------------------------------------------------------------------------

	private async scanExt(extCfg: ExtConfiguration): Promise<void> {

		const extId = extCfg.id;

		const srcExtFolder = join(
			extCfg.baseFolder,
			extCfg.distFolder || 'dist');

		ExtCtxGenerator.registerExtFolder(extId, extCfg.baseFolder);

		this.logger.info(`Loading <Extension> [ ${extId} ] from folder: ${extCfg.baseFolder}`);

		const services = await DiUtils.waitForFolder(srcExtFolder, true);
		this.logger.info(DiUtils.getServicesAsString(
			`Services loaded in the extension [ ${extId} ]: `,
			services,
			`Services loaded in the extension [ ${extId} ]: Not found`,
		));

	}

	private async loadExts(extsToLoad: Promise<void>[]) {
		for (const ext of extsToLoad) {
			await ext;
		}
	}

}
