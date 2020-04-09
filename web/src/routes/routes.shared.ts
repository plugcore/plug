import { ClassParameter, IsBoolean, IServiceArgs, IsNumber, IsString, Required } from '@plugcore/core';
import {
	DefaultParams, DefaultQuery, FastifyReply, FastifyRequest, HTTPMethod, RequestHandler, RouteShorthandOptions, DefaultHeaders
} from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { SupportedSecurityTypes } from '../configuration/configuration.insterfaces';

//
// Interfaces
//

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
 * All properties are ment to be class decorated with _@plugcore/core_
 * validator decorators. These could be `@IsString()`, `@IsNumber()`,
 * `@IsBoolean()`, `@IsArray()`, `@IsObject()` or `@Required()`
 */
export interface IRouteSchemas {
	/**
	 * Decorated class with validations that represents the request body.
	 * This field will be ignored if it's a GET method.
	 * If this field is applied, then by default it will determine that this
	 * route consumes `application/json`
	 */
	request?: ClassParameter<any> | { isArray: true; model: ClassParameter<any> };
	/**
	 * Decorated class with validations that represents the response.
	 * If this field is applied, then by default it will determine that this
	 * route produces `application/json`
	 */
	response?: ClassParameter<any> | { isArray: true; model: ClassParameter<any> };
	/**
	 * The parameters from the request are converted to an object.
	 * You can validate this parameters as it was a normal request object
	 */
	query?: ClassParameter<any>;
	/**
	 * The parameters defiend in the url, ex: `/:id`, are converted to an object.
	 * You can validate this parameters as it was a normal request object
	 */
	urlParameters?: ClassParameter<any>;
	/**
	 * As ir happens with the parameters, all headers will be converted
	 * to an object wich can be validated through a decotared class
	 * with validators
	 */
	headers?: ClassParameter<any>;
	/**
	 * Same as schema tags, it lets you categorice your apis
	 */
	tags?:  string[];
}

export interface Request<
	TBody = any, TUrlParams = DefaultParams, TParams = DefaultQuery,
	THeaders = DefaultHeaders, CustomData = any, JWTPayload = any | undefined
> extends FastifyRequest<IncomingMessage, TParams, TUrlParams, THeaders, TBody> {
	jwtPayload: JWTPayload;
	customData: CustomData;
}
export interface Response extends FastifyReply<ServerResponse> { }

export interface JwtLoginMeta {
	/**
	 * Defines the route schemas that will be used in JWT login route.
	 */
	routeSchemas: IRouteSchemas;
}

//
// Types
//

export type InRouteShorthandOptions = RouteShorthandOptions<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, DefaultHeaders, Body>;

type OmitedShorthandOptions = 'url' | 'onRequest' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization';
export type TMethodOptions = Omit<InRouteShorthandOptions, OmitedShorthandOptions> & {
	routeSchemas?: IRouteSchemas;
	onRequest?: InRouteShorthandOptions['onRequest'] | ((req: Request, res: Response) => Promise<any>);
	preParsing?: InRouteShorthandOptions['preParsing'] | ((req: Request, res: Response) => Promise<any>);
	preValidation?: InRouteShorthandOptions['preValidation'] | ((req: Request, res: Response) => Promise<any>);
	preHandler?: InRouteShorthandOptions['preHandler'] | ((req: Request, res: Response) => Promise<any>);
	preSerialization?: InRouteShorthandOptions['preSerialization'] | ((req: Request, res: Response, payload: any) => Promise<any>);
	security?: SupportedSecurityTypes | SupportedSecurityTypes[];
};

export type TRequestHandler = RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, DefaultHeaders, Body>;

export type BaiscAuthLoginFn = (user: string, password: string, request: Request, response: Response) => Promise<boolean>;
export type JwtLoginFn = (request: Request, response: Response) => Promise<any>;
export type JwtPreHandleFn = (request: Request, response: Response) => Promise<any>;
export type CustomAuthFn = (request: Request, response: Response) => Promise<any>;

//
// Models
//

export class ErrorResponseModel {
	@IsNumber()
	@Required()
	statusCode: number;
	@IsString()
	@Required()
	error: string;
	@IsString()
	@Required()
	message: string;
}

export class DefaultResponseModel {
	@IsBoolean()
	@Required()
	success: boolean;
}
