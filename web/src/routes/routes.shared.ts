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

/**
 * This object represents a list of validators for the route.
 * All properties are ment to be class decorated with _@plugdata/core_
 * validator decorators. These could be `@ValidString()`, `@ValidNumber()`,
 * `@ValidBoolean()`, `@ValidArray()`, `@ValidObject()` or `@RequiredProperty()`
 */
export interface IRouteValidation {
	/**
	 * Decorated class with validations that represents the request body.
	 * This field will be ignored if it's a GET method.
	 * If this field is applied, then by default it will determine that this
	 * route consumes `application/json`
	 */
	request?: ClassParameter<any>;
	/**
	 * Decorated class with validations that represents the response.
	 * If this field is applied, then by default it will determine that this
	 * route produces `application/json`
	 */
	response?: ClassParameter<any>;
	/**
	 * The parameters from the request are converted to an object.
	 * You can validate this parameters as it were a normal request object
	 */
	parameters?: ClassParameter<any>;
	/**
	 * As ir happens with the parameters, all headers will be converted
	 * to an object wich can be validated through a decotared class
	 * with validators
	 */
	headers?: ClassParameter<any>;
}

export interface Request extends FastifyRequest<IncomingMessage, DefaultQuery, DefaultParams, Headers, Body> { }
export interface Response extends FastifyReply<ServerResponse> { }

export type InRouteShorthandOptions = RouteShorthandOptions<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, Headers, Body>;

type OmitedShorthandOptions = 'url' | 'onRequest' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization';
export type TMethodOptions = Omit<InRouteShorthandOptions, OmitedShorthandOptions> & {
	routeValidation?: IRouteValidation;
	onRequest?: InRouteShorthandOptions['onRequest'] | ((req: Request, res: Response) => Promise<any>);
	preParsing?: InRouteShorthandOptions['preParsing'] | ((req: Request, res: Response) => Promise<any>);
	preValidation?: InRouteShorthandOptions['preValidation'] | ((req: Request, res: Response) => Promise<any>);
	preHandler?: InRouteShorthandOptions['preHandler'] | ((req: Request, res: Response) => Promise<any>);
	preSerialization?: InRouteShorthandOptions['preSerialization'] | ((req: Request, res: Response, payload: any) => Promise<any>);
};

export type TRequestHandler = RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, Headers, Body>;

