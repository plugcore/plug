import { ClassParameter } from '../utils/typescript.utils';

export interface IDatasourceInfo {
	type: string;
}

export interface IDatasourceEntry extends IDatasourceInfo {
	serviceClass: ClassParameter<any>;
}
