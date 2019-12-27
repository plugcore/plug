import { Configuration } from '../configuration/configuration.interfaces';
import { DeepPartial } from '../utils/typescript.utils';

export class TestUtils {

	public static createConfiguration(cfg: DeepPartial<Configuration>) {
		const basicConfiguration: Configuration = {
			init: { distFolder: '' },
			connections: {},
			log: {},
			getConnectionConfiguration: <T>() => <T>{}
		};

		return Object.assign(basicConfiguration, cfg);
	}

}
