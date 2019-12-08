import { ClassParameter } from '../utils/typescript.utils';

/**
 * Use this interface when your class has an async
 * condition in order to be ready. All dependencies
 * will be loaded before calling this method
 */
export interface OnInit {

	onInit(): Promise<void>;

}

/**
 * Service interface.
 */

export type IServiceIdentifier<T = any> = ClassParameter<T> | string;

export interface IServiceArgs<T = any> {
	sId?: IServiceIdentifier<T>;
	ctx?: string;
	connection?: string;
}

export interface IInjectArgs<T = any> extends IServiceArgs<T> {
	variationVarName?: string;
	variation?: Record<string, any>;
	variationIsOptional?: boolean;
}

/**
 * Constructor handler interface
 */

export interface IConstructorHandler {
	targetId: IServiceIdentifier;
	index: number;
}

/**
 * Entry model, internal usage only
 */
export interface IDiEntry<T = any> {
	serviceId: string;
	isReady: boolean;
	depsClosed: boolean;
	isOnlyTemplate: boolean;
	serviceClass?: ClassParameter<T>;
	object?: any;
	constructorHandlers?: IDiConstructorHandler[];
	depsLeft?: IDiDepLeft[];
	cbWaiting?: Function[];
	propertiesWaiting?: {
		id: IServiceIdentifier;
		ctx?: string;
		variation?: Record<string, any>;
		cb: (service: any) => void;
	}[];
	metadata?: any;
	variation?: Record<string, any>;
}

export interface IDiDepLeft {
	targetServiceId: string;
	depMet: boolean;
	targetCtx?: string;
	variationVarName?: string;
	variationVarValue?: any;
}

export interface IDiConstructorHandler extends Omit<IDiDepLeft, 'depMet'> {
	index: number;
	variation?: Record<string, any>;
}

/**
 * Service metadata attached to the class (in js represented as a Function)
 * so you can determine if the given class is a service mantained by the
 * Container
 */
export interface IDiServiceMetadata {
	serviceId: IServiceIdentifier;
	ctx?: string;
}
