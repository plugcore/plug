import { ClassParameter, TypeChecker } from '@plugdata/core';
import { IControllerOptions, IRegisteredController, TMethodOptions, IRegsiteredMethod } from './routes.shared';
import { HTTPMethod } from 'fastify';

export class RoutesUtils {

	private static controllerList: IRegisteredController[] = [];

	public static readonly propertyMetadataPrefix = 'p-controller-method:';

	public static registerController(controller: ClassParameter<any>, options?: IControllerOptions) {

		// Save it to later inspect
		this.controllerList.push({ controller, options });

	}

	public static getAllControllers() {
		return this.controllerList;
	}

	public static registerMethod(
		httpMethod: HTTPMethod, meta: { controller: ClassParameter<any>; methodName: string }, options?: TMethodOptions
	) {

		const registeredMethod: IRegsiteredMethod = {
			httpMethod,
			options,
			methodName: meta.methodName
		};
		Reflect.defineMetadata(`${this.propertyMetadataPrefix}:${meta.methodName}`, meta.controller, registeredMethod);

	}

	public static getRegisteredMethods<T>(clazz: ClassParameter<T>): IRegsiteredMethod[] {
		const keys = Reflect.getMetadataKeys(clazz.prototype);
		return keys
			.filter(metadataKey => TypeChecker.isString(metadataKey) && metadataKey.startsWith(this.propertyMetadataPrefix))
			.map(metadataKey => Reflect.getMetadata(metadataKey, clazz.prototype));
	}

}