import { IDatasourceInfo } from './data-source.interfaces';
import { Service } from '../dependecy-injection/di.decorators';
import { DatasourceUtils } from './data-source.utils';
import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';

/**
 * Marks this service as a datasource
 * @param inp
 */
export function DataSource(inp: IDatasourceInfo) {

	return (target: ClassParameter<any>) => {
		if (TypeChecker.isClass(target)) {
			Service({})(target);
			DatasourceUtils.registerDatsource(inp, target);
		}
	};

}
