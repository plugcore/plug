import { ClassParameter, IServiceArgs } from '@plugdata/core';
import { HTTPMethod, RouteOptions } from 'fastify';

export interface IControllerOptions {
	base?: string;
	service?: IServiceArgs;
}

export interface IRegisteredController {
	controller: ClassParameter<any>;
	options?: Omit<IControllerOptions, 'service'>;
}

export interface IRegsiteredMethod {
	httpMethod: HTTPMethod;
	options?: TMethodOptions;
	methodName: string;
}

export type TMethodOptions = string | Omit<RouteOptions, 'method'>;

