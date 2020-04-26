import { ClassParameter, IsBoolean, IServiceArgs, IsNumber, IsString, Required } from '@plugcore/core';
import {
	DefaultParams, DefaultQuery, FastifyReply, FastifyRequest, HTTPMethod, RequestHandler, RouteShorthandOptions, DefaultHeaders
} from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { SupportedSecurityTypes } from '../configuration/configuration.insterfaces';
import { SecurityRequirementObject } from 'openapi3-ts';
import { ReadStream } from 'fs';

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
	tags?: string[];
	/**
	 * Hides route from result OpenAPI document
	 * @default false
	 */
	hide?: boolean;
	/**
	 * Route description
	 */
	description?: string;
	/**
	 * Route summary
	 */
	summary?: string;
	/**
	 * Media types route consumes
	 */
	consumes?: string[];
	/**
	 * Media types route produces
	 */
	produces?: string[];
	/**
	 * OpenAPI security definitions
	 */
	security?: SecurityRequirementObject[];
	/**
	 * OpenAPI operation unique identifier
	 */
	operationId?: string;
}

export interface Request<
	TBody = any, TUrlParams = DefaultParams, TParams = DefaultQuery,
	THeaders = DefaultHeaders, CustomData = any, JWTPayload = any | undefined
> extends FastifyRequest<IncomingMessage, TParams, TUrlParams, THeaders, TBody> {
	jwtPayload: JWTPayload;
	isMultipart?: boolean;
	multipartTempFiles?: string[];
	customData: CustomData;
}
export interface Response extends FastifyReply<ServerResponse> {
	uploadFile: (rs: ReadStream, fileName: string, mimeType: string) => ReadStream;
}

export interface JwtLoginMeta {
	/**
	 * Defines the route schemas that will be used in JWT login route.
	 */
	routeSchemas: IRouteSchemas;
}

//
// Types
//

export type InRouteShorthandOptions = RouteShorthandOptions<Request, Response, DefaultQuery, DefaultParams, DefaultHeaders, Body>;

type OmitedShorthandOptions = 'url' | 'onRequest' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization';
export type TMethodOptions = Omit<InRouteShorthandOptions, OmitedShorthandOptions> & {
	routeSchemas?: IRouteSchemas;
	onRequest?: ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response) => Promise<void>)[];
	preParsing?: ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response) => Promise<void>)[];
	preValidation?: ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response) => Promise<void>)[];
	preHandler?: ((req: Request, res: Response) => Promise<void>) | ((req: Request, res: Response) => Promise<void>)[];
	preSerialization?: ((req: Request, res: Response, payload: any) => Promise<void>);
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

export class FileField {
	@IsString()
	@Required()
	fileName: string;

	@IsString()
	@Required()
	encoding: string;

	@IsString()
	@Required()
	mimetype: string;

	@IsString()
	@Required()
	filePath: string;
}
