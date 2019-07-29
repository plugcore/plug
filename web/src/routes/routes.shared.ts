import { ClassParameter, IServiceArgs } from '@plugdata/core';
import { FastifyRequest, FastifyReply, DefaultParams, DefaultQuery, HTTPMethod, RequestHandler, RouteShorthandOptions } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export interface IControllerOptions {
	urlBase: string;
	service?: IServiceArgs;
}

export interface IRegisteredController {
	controller: ClassParameter<any>;
	options: IControllerOptions;
}

export interface IRegsiteredMethod {
	httpMethod: HTTPMethod;
	options?: TMethodOptions;
	path?: string;
	methodName: string;
}

export interface Request extends FastifyRequest<IncomingMessage, DefaultQuery, DefaultParams, Headers, Body> {}
export interface Response extends FastifyReply<ServerResponse> {}

export type TMethodOptions = Omit<RouteShorthandOptions<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, Headers, Body>, 'url'>;

export type TRequestHandler = RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, Headers, Body>;

