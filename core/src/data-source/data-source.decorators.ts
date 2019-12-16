import { IDatasourceInfo } from './data-source.interfaces';
import { Service } from '../dependecy-injection/di.decorators';
import { DatasourceUtils } from './data-source.utils';
import { TypeChecker } from '../utils/type.checker';

/**
 * Marks this service as a datasource
 * @param inp
 */
export function DataSource(inp: IDatasourceInfo): Function {

	return (target: Function) => {

		if (TypeChecker.isClass(target)) {
			Service({})(target);
			DatasourceUtils.registerDatsource(inp, target);
		}

	};

}
