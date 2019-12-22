import { join } from 'path';
import { PlugdataConstants } from '../../constants/plugdata.constants';
import { Service } from '../../dependecy-injection/di.decorators';
import { OnInit } from '../../dependecy-injection/di.shared';
import { FsUtils } from '../../io/fs.utils';
import { ObjectUtils } from '../../utils/object.utils';
import { ExtConfiguration } from './ext-configuration.interface';
import { DefaultExtConfiguration } from './ext-default.configuration';

@Service()
export class ExtsConfigurationChecker implements OnInit {

	public scannedExts: ExtConfiguration[] = [];
	public primaryExt: ExtConfiguration;

	public async onInit() {

		// Base ext load
		const extBaseFolder = process.cwd();
		const baseExt = await this.generateExtensionConfiguration(extBaseFolder);

		// Base ext defines all server configuration
		this.primaryExt = baseExt;

		// Ext folders to load
		this.scannedExts.push(baseExt);
	}

	/**
	 * Generates the extension configuration object and adds it to the
	 * dependency injection container. All the properties have a default
	 * value but can be overriden by properties defined in the
	 * 'pcms-cfg/configuration.json' file in the extension directory
	 * @param extBaseFolder
	 */
	private async generateExtensionConfiguration(extBaseFolder: string): Promise<ExtConfiguration> {


		let extCfg: ExtConfiguration = new DefaultExtConfiguration();
		const jsonPath = join(extBaseFolder, PlugdataConstants.pcmsCfgJson);
		const extJsonCfg = JSON.parse(await FsUtils.loadFile(jsonPath));

		extCfg = ObjectUtils.deepMerge(extCfg, extJsonCfg);
		extCfg.baseFolder = extBaseFolder;

		return extCfg;

	}

}
