
/**
 * Use this interface when your class has an async
 * condition in order to be ready. All dependencies
 * will be loaded when calling this method
 */
export interface IDiOnInit {

	onInit(): Promise<void>;

}

/**
 * Service interface.
 */

export type IServiceIdentifier = Function | string;

export interface IServiceArgs {
	sId?: IServiceIdentifier;
	ctx?: string;
}

export interface IInjectArgs extends IServiceArgs{
	variationVarName?: string;
	variation?: Record<string, any>;
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
export interface IDiEntry {
	serviceId: string;
	isReady: boolean;
	depsClosed: boolean;
	isOnlyTemplate: boolean;
	serviceClass?: Function;
	object?: any;
	constructorHandlers?: {
		targetServiceId: string;
		index: number;
		targetCtx?: string;
		variationVarName?: string;
		variationVarValue?: any;
	}[];
	depsLeft?: {
		targetServiceId: string;
		depMet: boolean;
		targetCtx?: string;
		variationVarName?: string;
		variationVarValue?: any;
	}[];
	cbWaiting?: Function[];
	metadata?: any;
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
