import { IDatasourceEntry, IDatasourceInfo } from './data-source.interfaces';
import { ClassParameter } from '../utils/typescript.utils';

export class DatasourceUtils {

	private static entries: IDatasourceEntry[] = [];

	/**
	 * Saves the datasource type
	 * @param inp
	 * @param serviceClass
	 */
	public static registerDatsource(inp: IDatasourceInfo, serviceClass: ClassParameter<any>) {
		this.entries.push({
			...inp, ...{ serviceClass }
		});
	}

	/**
	 * Returns a list of all the datasources registered until now
	 */
	public static getDatasources() {
		return this.entries;
	}

}
