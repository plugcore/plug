import { ClassParameter, TypeChecker, IDiEntry, Container } from '@plugcore/core';
import { HTTPMethod } from 'fastify';
import {
	IControllerOptions, IRegisteredController, IRegsiteredMethod, TMethodOptions, BaiscAuthLoginFn,
	JwtLoginFn, Request, Response, CustomAuthFn, JwtPreHandleFn, JwtLoginMeta
} from './routes.shared';

export class RoutesUtils {

	//
	// Internal variables
	//

	private static controllerList: IRegisteredController[] = [];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static basicAuthLoginFn: BaiscAuthLoginFn = async (user: string, password: string, request: Request) => {
		throw new Error('Basic auth login not implemented');
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static jwtLoginFn: JwtLoginFn = async (request: Request) => {
		throw new Error('Basic auth login not implemented');
	};
	public static jwtLoginMeta: JwtLoginMeta | undefined;
	public static jwtPreHandleFn: JwtPreHandleFn | undefined;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static customAuthFn: CustomAuthFn = async (request: Request, response: Response) => {
		throw new Error('Custom auth not implemented');
	};


	//
	// Metadata keys
	//

	public static readonly propertyMetadataPrefix = 'p-controller-method:';
	public static readonly basicAtuhMetadataPrefix = 'p-basic-auth-login-fn';
	public static readonly jwtMetadataPrefix = 'p-jwt-login-fn';
	public static readonly jwtRouteMetadataPrefix = 'p-jwt-login-route';
	public static readonly jwtPreHandleMetadataPrefix = 'p-jwt-pre-handle-fn';
	public static readonly customAuthMetadataPrefix = 'p-custom-auth-fn';

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
			const jwtRouteMeta = Reflect.getMetadata(this.jwtRouteMetadataPrefix, entry.serviceClass.prototype);
			const jwtPreHandleFn = Reflect.getMetadata(this.jwtPreHandleMetadataPrefix, entry.serviceClass.prototype);
			const customAuthFn = Reflect.getMetadata(this.customAuthMetadataPrefix, entry.serviceClass.prototype);

			// 2: if it's the case, then replace the default function
			if (basicAuthLoginFn) {
				this.basicAuthLoginFn = entry.object[basicAuthLoginFn].bind(entry.object);
			}
			if (jwtLoginFn) {
				this.jwtLoginFn = entry.object[jwtLoginFn].bind(entry.object);
			}
			if (jwtPreHandleFn) {
				this.jwtPreHandleFn = entry.object[jwtPreHandleFn].bind(entry.object);
			}
			if (customAuthFn) {
				this.customAuthFn = entry.object[customAuthFn].bind(entry.object);
			}
			if (jwtRouteMeta) {
				this.jwtLoginMeta = jwtRouteMeta;
			}

		}
	}

	public static registerBasicAuthLoginFn(clazz: ClassParameter<any>, methodName: string) {
		Reflect.defineMetadata(this.basicAtuhMetadataPrefix, methodName, clazz.prototype);
	}
	public static registerJwtLoginFn(clazz: ClassParameter<any>, methodName: string, meta?: JwtLoginMeta) {
		Reflect.defineMetadata(this.jwtMetadataPrefix, methodName, clazz.prototype);
		if (meta) {
			Reflect.defineMetadata(this.jwtRouteMetadataPrefix, meta, clazz.prototype);
		}
	}
	public static registerJwtPreHandleFn(clazz: ClassParameter<any>, methodName: string) {
		Reflect.defineMetadata(this.jwtPreHandleMetadataPrefix, methodName, clazz.prototype);
	}
	public static registerCustomAuthFn(clazz: ClassParameter<any>, methodName: string) {
		Reflect.defineMetadata(this.customAuthMetadataPrefix, methodName, clazz.prototype);
	}

}

// We attach to the service ready event
Container.onServiceReady(RoutesUtils.onServiceReady.bind(RoutesUtils));
