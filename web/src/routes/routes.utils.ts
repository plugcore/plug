import { ClassParameter, TypeChecker, IDiEntry } from '@plugdata/core';
import { HTTPMethod } from 'fastify';
import {
	IControllerOptions, IRegisteredController, IRegsiteredMethod, TMethodOptions, BaiscAuthLoginFn, JwtLoginFn, Request
} from './routes.shared';

export class RoutesUtils {

	//
	// Internal variables
	//

	private static controllerList: IRegisteredController[] = [];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static basicAuthLoginFn: BaiscAuthLoginFn = async (user: string, passwotd: string) => {
		throw new Error('Basic auth login not implemented');
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static jwtLoginFn: JwtLoginFn = async (request: Request) => {
		throw new Error('Basic auth login not implemented');
	};

	//
	// Metadata keys
	//

	public static readonly propertyMetadataPrefix = 'p-controller-method:';
	public static readonly basicAtuhMetadataPrefix = 'p-basic-auth-login-fn';
	public static readonly jwtMetadataPrefix = 'p-jwt-login-fn';

	//
	// Controller utils
	//

	public static registerController(controller: ClassParameter<any>, options: IControllerOptions) {

		// Save it to later inspect
		this.controllerList.push({ controller, options });

	}

	public static getAllControllers() {
		return this.controllerList;
	}

	public static registerMethod(
		decoratorOptions: { httpMethod: HTTPMethod; path?: string; options?: TMethodOptions },
		decoratorMeta: { controller: ClassParameter<any>; methodName: string },
	) {
		const registeredMethod: IRegsiteredMethod = {
			httpMethod: decoratorOptions.httpMethod,
			options: decoratorOptions.options,
			path: decoratorOptions.path,
			methodName: decoratorMeta.methodName
		};
		Reflect.defineMetadata(`${this.propertyMetadataPrefix}${decoratorMeta.methodName}`, registeredMethod, decoratorMeta.controller);
	}

	public static getRegisteredMethods<T>(clazz: ClassParameter<T>): IRegsiteredMethod[] {
		const keys = Reflect.getMetadataKeys(clazz.prototype);
		return keys
			.filter(metadataKey => TypeChecker.isString(metadataKey) && metadataKey.startsWith(this.propertyMetadataPrefix))
			.map(metadataKey => Reflect.getMetadata(metadataKey, clazz.prototype));
	}

	//
	// Auth utils
	//

	public static onServiceReady(entry: IDiEntry) {
		if (entry.object && entry.serviceClass) {

			// 1: Check if the have marked some function as login fn metada
			const basicAuthLoginFn = Reflect.getMetadata(this.basicAtuhMetadataPrefix, entry.serviceClass.prototype);
			const jwtLoginFn = Reflect.getMetadata(this.jwtMetadataPrefix, entry.serviceClass.prototype);

			// 2: if it's the case, then replace the default function
			if (basicAuthLoginFn) {
				this.basicAuthLoginFn = entry.object[basicAuthLoginFn].bind(entry.object);
			}
			if (jwtLoginFn) {
				this.jwtLoginFn = entry.object[jwtLoginFn].bind(entry.object);
			}

		}
	}

	public static registerBasicAuthFn(clazz: ClassParameter<any>, methodName: string) {
		Reflect.defineMetadata(this.basicAtuhMetadataPrefix, methodName, clazz);
	}
	public static registerJwtLoginFn(clazz: ClassParameter<any>, methodName: string) {
		Reflect.defineMetadata(this.jwtMetadataPrefix, methodName, clazz);
	}

}
