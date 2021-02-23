import { ArrayUtils, ClassParameter, Configuration, Container, FsUtils, InjectConfiguration, InjectLogger, Logger, ObjectUtils, ObjectValidatorUtils, OnEvent, PublicEvents, Service, TypeChecker, ValidatorUtils } from '@plugcore/core';
import Ajv from 'ajv';
import * as Busboy from 'busboy';
import { FastifyPluginCallback, FastifyRequest, FastifySchema, HTTPMethods, RawRequestDefaultExpression } from 'fastify';
import fastifyAuth from 'fastify-auth';
import cookies from 'fastify-cookie';
import * as oas from 'fastify-oas';
import fstatic from 'fastify-static';
import { ContentTypeParserDoneFunction, FastifyContentTypeParser } from 'fastify/types/content-type-parser';
import { createWriteStream, ReadStream } from 'fs';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { decode, encode } from 'jwt-simple';
import { SecuritySchemeObject } from 'openapi3-ts';
import { join } from 'path';
import { WebConfiguration } from '../configuration/configuration.default';
import { FileUploadWebConfiguration, JwtAvailableAlgorithms, SupportedSecurityTypes, WebOasConfiguration } from '../configuration/configuration.insterfaces';
import { MimeTypes } from './routes.constants';
import { RoutesService } from './routes.service';
import { ErrorResponseModel, FileField, IRegisteredController, IRouteSchemas, Request, Response, TMethodOptions } from './routes.shared';
import { RoutesUtils } from './routes.utils';

@Service()
export class RoutesInitializer {

	private readonly eventNames = ['onRequest', 'preParsing', 'preValidation', 'preHandler', 'preSerialization'];

	private securityEnabled = false;
	private jwtConfiguration = {
		// Default private key, should be changed
		privateKey: '8981F9391AF549443CC7D5141B24DJ4C',
		algorithm: <JwtAvailableAlgorithms>'HS256',
		expiration: <number | undefined>undefined
	};
	private oasDocumentationPath: string;
	private ajvCustomInstance: Ajv;

	constructor(
		@InjectLogger('httpcontroller') private log: Logger,
		private routesService: RoutesService,
		@InjectConfiguration() private configuration: Configuration
	) {

		this.securityEnabled = configuration.web && configuration.web.auth && configuration.web.auth.eanbled || false;

		this.oasDocumentationPath = (
			configuration.web && configuration.web.oas && configuration.web.oas.documentationPath
		) || WebConfiguration.default.web.oas.documentationPath || '/api/documentation';

		this.ajvCustomInstance = new Ajv({
			useDefaults: true,
			coerceTypes: true,
			$data: true
		});
		this.ajvCustomInstance.addKeyword('isFileType', {
			keyword: 'isFileType',
			compile: (_, parent) => {
				// Change the schema type, as this is post validation it doesn't appear to error.
				(parent as any).type = 'file';
				delete (parent as any).isFileType;
				return () => true;
			},
		});

	}

	@OnEvent(PublicEvents.allServicesLoaded)
	public onServicesReady() {
		this.log.debug('All services loaded, starting http server...');
		this.initHttpServer().then();
	}

	public async initHttpServer() {

		for (const cfgFn of RoutesUtils.fastifyConfigurationFns) {
			try {
				cfgFn(this.routesService.fastifyInstance);
			} catch (error) {
				this.log.error('Error on Fastify configuration method: ', error);
			}
		}

		const restControllers = await Promise.all(this.getMethodsServices());

		if (this.configuration.web && this.configuration.web.fileUpload && this.configuration.web.fileUpload.enabled) {
			this.routesService.fastifyInstance.addContentTypeParser('multipart', this.multipartImpl());
			this.routesService.fastifyInstance
				// Lets you Defile file fields
				/* .schemaCompiler((schema: any) => this.ajvCustomInstance.compile(schema)) */
				// Indicates if the request has been execcuted with fiel upload
				.decorateRequest('isMultipart', false)
				// If teh request is multipart, then this is a list of temp filtes to delete
				.decorateRequest('multipartTempFiles', undefined);
		}

		if (this.securityEnabled) {
			this.routesService.fastifyInstance
				// Decorate fastify with login pre hnadle implementations
				.decorate('verifyJwt', this.verifyJwt.bind(this))
				.decorate('verifyUserAndPassword', this.verifyUserAndPassword.bind(this))
				.decorate('customAuth', this.customAuth.bind(this))
				// With this we are telling fastify that we will have a new property of the request object
				.decorateRequest('jwtPayload', undefined)
				// Custom data object that anybody can use in the request to put their data
				.decorateRequest('customData', {})
				// Auth plugin registration
				.register(fastifyAuth);
		}

		this.routesService.fastifyInstance
			// OAS
			.register(this.oasPlugin(restControllers), { prefix: this.oasDocumentationPath })
			// Cookies support
			.register(cookies)
			// Custom routes
			.register(this.methodsPlugin(restControllers, {
				configFilePath: this.configuration.getConfigurationFolder(),
				config: this.configuration.web ? this.configuration.web.fileUpload : undefined,
			}));

		if (this.securityEnabled) {
			this.routesService.fastifyInstance
				// Auth routes
				.register(this.authPlugin.bind(this));
		}

		await this.routesService.startHttpServer();

	}

	private getMethodsServices() {

		const controllers = RoutesUtils.getAllControllers();
		return controllers.map(async controller => {

			// 1: Get service from di container
			const serviceId = (controller.options && controller.options.service && controller.options.service.sId) ?
				controller.options.service.sId : controller.controller;
			const context = (controller.options && controller.options.service && controller.options.service.ctx) ?
				controller.options.service.ctx : undefined;
			const controllerService = await Container.get<any>(serviceId, undefined, context);
			return { controllerService, controller };

		});

	}

	private authPlugin: FastifyPluginCallback<{}> = (plugin, _, done) => {

		// Auth system

		if (this.configuration.web && this.configuration.web.auth && this.securityEnabled) {

			// Set jwt configuration
			this.jwtConfiguration.algorithm = this.configuration.web.auth.jwtAlgorithm || this.jwtConfiguration.algorithm;
			this.jwtConfiguration.privateKey = this.configuration.web.auth.jwtPrivateKey || this.jwtConfiguration.privateKey;
			this.jwtConfiguration.expiration = this.configuration.web.auth.jwtExpiration || this.jwtConfiguration.expiration;

			// Other vars
			const loginUrl = this.configuration.web.auth.jwtLoginPath || '/auth/login';

			// Register JWT login route
			plugin.route({
				method: 'POST',
				url: loginUrl,
				handler: <any>this.handleJwtLogin.bind(this),
				schema: RoutesUtils.jwtLoginMeta ?
					this.createFromRouteSchemas('POST', RoutesUtils.jwtLoginMeta.routeSchemas) : undefined
			});

		}

		done();

	};

	private oasPlugin: (restControllers: {
		controllerService: any;
		controller: IRegisteredController;
	}[]) => FastifyPluginCallback<{}> = (restControllers) => (plugin, _, done) => {

		// OAS configuration

		const defaultServers = { servers: [{ url: `http://${this.routesService.host}:${this.routesService.httpPort}` }] };
		const defaultConfiguration = ObjectUtils.deepMerge(ObjectUtils.deepClone(WebConfiguration.default.web.oas), defaultServers);
		const oasConfiguration: WebOasConfiguration = (this.configuration.web && this.configuration.web.oas) ?
			ObjectUtils.deepMerge(defaultConfiguration, this.configuration.web.oas) : defaultConfiguration;
		const oasSecurity = this.configuration.web && this.configuration.web.auth && this.configuration.web.auth.securityInOas;
		const securityHandlers: any[] = [];

		if (!oasConfiguration.enableDocumentation) {
			done();
			return;
		}

		if (this.securityEnabled && oasSecurity) {

			// Create security handlers
			if (oasSecurity.includes('jwt')) {
				securityHandlers.push(plugin.verifyJwt);
			}
			if (oasSecurity.includes('basic')) {
				securityHandlers.push(plugin.verifyUserAndPassword);
			}

		}

		if (this.securityEnabled) {

			// Check all controllers and global configuration
			// to know all the security types
			const allControllerSecurity = restControllers.map(r =>
				RoutesUtils.getRegisteredMethods(r.controller.controller).map(c =>
					c.options ?
						c.options.security ? Array.isArray(c.options.security) ? c.options.security : [c.options.security] :
						[] : []
				)
			);
			const controllerSecurityTypes = ArrayUtils.flat(allControllerSecurity);
			if (this.configuration.web && this.configuration.web.auth && this.securityEnabled) {
				controllerSecurityTypes.concat(
					this.configuration.web.auth.securityInAllRoutes ?
						Array.isArray(this.configuration.web.auth.securityInAllRoutes) ?
							this.configuration.web.auth.securityInAllRoutes : [this.configuration.web.auth.securityInAllRoutes] :
						[]
				);
			}
			const possibleSecurityTypes = ArrayUtils.flatAndRemoveDuplicates(controllerSecurityTypes);
			const securitySchemes: Record<string, SecuritySchemeObject> = {};

			for (const securityType of possibleSecurityTypes) {

				if (securityType === 'basic') {
					securitySchemes['BasicAuth'] = { type: 'http', scheme: 'basic' };
				}
				if (securityType === 'jwt') {
					securitySchemes['JWTBearerAuth'] = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' };
				}

			}

			if (Object.keys(securitySchemes).length > 0) {
				const components = oasConfiguration.components || {};
				// TODO Remove any
				components.securitySchemes = <any>securitySchemes;
				oasConfiguration.components = components;
			}

		}

		plugin.register(oas, {
			routePrefix: this.oasDocumentationPath,
			exposeRoute: false,
			addModels: true,
			swagger: oasConfiguration
		});

		this.log.info('Registering API documentation at: ' + this.oasDocumentationPath);

		// Documentation route
		plugin.route({
			url: '/',
			method: 'GET',
			schema: { hide: true } as any,
			preHandler: securityHandlers.length > 0 ? plugin.auth(securityHandlers) : undefined,
			handler: (_, reply) => {
				reply.redirect(this.oasDocumentationPath + '/index.html');
			}
		});

		plugin.route({
			url: '/json',
			method: 'GET',
			schema: { hide: true } as any,
			preHandler: securityHandlers.length > 0 ? plugin.auth(securityHandlers) : undefined,
			handler: (_, reply) => {
				reply.send(plugin.oas());
			},
		});

		plugin.route({
			url: '/yaml',
			method: 'GET',
			schema: { hide: true } as any,
			preHandler: securityHandlers.length > 0 ? plugin.auth(securityHandlers) : undefined,
			handler: (_, reply) => {
				reply.type('application/x-yaml').send((<any>plugin).oas({ yaml: true }));
			},
		});

		// serve swagger-ui with the help of fs-static
		const oasNodeModulePath = require.resolve('fastify-oas');
		plugin.register(fstatic, {
			root: join(oasNodeModulePath, '..', '..', 'static'),
		});

		done();

	};

	private methodsPlugin: (
		restControllers: {
			controllerService: any;
			controller: IRegisteredController;
		}[],
		fileConfig: {
			configFilePath: string;
			config?: FileUploadWebConfiguration;
		}
	) => FastifyPluginCallback<{}> = (restControllers, fileConfig) => (plugin, _, done) => {

		let securityOnAllRoutes = this.configuration && this.configuration.web &&
			this.configuration.web.auth && this.securityEnabled && this.configuration.web.auth.securityInAllRoutes;
		if (securityOnAllRoutes) {
			securityOnAllRoutes = Array.isArray(securityOnAllRoutes) ? securityOnAllRoutes : [securityOnAllRoutes];
		} else {
			securityOnAllRoutes = [];
		}

		for (const restController of restControllers) {

			const methods = RoutesUtils.getRegisteredMethods(restController.controller.controller);

			// 2: Attach all controller methods to fastify methods
			for (const method of methods) {

				const controllerMethodHandler = restController.controllerService[method.methodName].bind(restController.controllerService);
				const controllerOptions: TMethodOptions = method.options || <TMethodOptions>{};
				const url = restController.controller.options.urlBase + (method.path || '');

				// Check all events, since they can be names of custom functions of the service
				// and not stand alone functions.
				if (ArrayUtils.someContentsAreTheSame(Object.keys(controllerOptions), this.eventNames)) {
					for (const eventName of this.eventNames) {
						const possibleEventFunction = (<Record<string, any>>controllerOptions)[eventName];
						if (possibleEventFunction && typeof possibleEventFunction === 'function') {
							const functName = possibleEventFunction.name;
							if (restController.controller.controller.prototype[functName] === possibleEventFunction) {
								(<Record<string, any>>controllerOptions)[eventName] =
									restController.controllerService[functName].bind(restController.controllerService);
							}
						}
					}
				}

				// Schema definition
				const routeSchemas = controllerOptions.routeSchemas;
				let schema: FastifySchema = this.cloneSchema(controllerOptions.schema || {});

				// Route validations
				if (routeSchemas) {

					schema = this.createFromRouteSchemas(method.httpMethod, routeSchemas, schema);

				}
				controllerOptions.routeSchemas = undefined;

				if (this.securityEnabled) {

					// Checck if this controller has security, either becouse of global security
					// and or specific security of this route
					let allAffectedSecurityTypes = (
						this.configuration.web && this.configuration.web.auth && this.configuration.web.auth.securityInAllRoutes ?
							Array.isArray(this.configuration.web.auth.securityInAllRoutes) ? this.configuration.web.auth.securityInAllRoutes :
							[this.configuration.web.auth.securityInAllRoutes] : []
					) || [];
					if (controllerOptions.security) {
						allAffectedSecurityTypes = allAffectedSecurityTypes.concat(
							Array.isArray(controllerOptions.security) ? controllerOptions.security : [controllerOptions.security]
						);
					}
					const allSecurityTypes = ArrayUtils.removeDuplicates(allAffectedSecurityTypes);
					const routeSecurity: any[] = [];
					const regexAuth: string[] = [];
					for (const securityType of allSecurityTypes) {
						if (securityType === 'jwt') {
							routeSecurity.push({ JWTBearerAuth: [] });
							regexAuth.push('Bearer');
						} else if (securityType === 'basic') {
							routeSecurity.push({ BasicAuth: [] });
							regexAuth.push('Basic');
						}
					}

					if (routeSecurity.length > 0) {
						schema.security = routeSecurity;
					}

					// TODO: Check tests, and add heather only when necesssary
					/* if (regexAuth.length > 0) {
						const headerSchema: Record<string, any> = schema.headers || {
							type: 'object',
							properties: {}
						};
						const properties = headerSchema.properties || <any>{};
						if (!properties.Authorization) {
							properties.Authorization = {
								type: 'string',
								pattern: `^(${regexAuth.join('|')}) .*$`
							};
						}
						const prevRequired = headerSchema.required || [];
						if (!prevRequired.includes('Authorization')) {
							prevRequired.push('Authorization');
						}
						headerSchema.required = prevRequired;
						schema.headers = headerSchema;
					} */

				}

				// Check if we have to put some securty
				if (securityOnAllRoutes.length > 0 || controllerOptions.security) {
					const currentPreHandlers = controllerOptions.preHandler ?
						Array.isArray(controllerOptions.preHandler) ? controllerOptions.preHandler : [controllerOptions.preHandler] : [];
					const securityTypes = Array.isArray(controllerOptions.security) ? controllerOptions.security : [controllerOptions.security];
					const securityHandlers: any[] = [];

					if (securityOnAllRoutes.includes('jwt') || securityTypes.includes('jwt')) {
						securityHandlers.push(plugin.verifyJwt);
					}
					if (securityOnAllRoutes.includes('basic') || securityTypes.includes('basic')) {
						securityHandlers.push(plugin.verifyUserAndPassword);
					}
					if (securityOnAllRoutes.includes('custom') || securityTypes.includes('custom')) {
						securityHandlers.push(plugin.customAuth);
					}

					if (
						!(securityTypes.length === 1 && securityTypes[0] === 'none') &&
						securityHandlers.length > 0 && this.securityEnabled
					) {
						// TODO, remove <any>
						controllerOptions.preHandler = <any>currentPreHandlers.concat(plugin.auth(
							securityHandlers
						));

						if (schema.response) {
							(schema.response as any)[401] = ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel);
						} else {
							schema.response = { 401: ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel) };
						}

					}

				}

				// Check if we have a multipart request, then we have to transform
				// incoming request body with request schema if exists
				if ((schema.consumes || []).includes(MimeTypes.multipartFormData)) {
					const currentPreValidation = controllerOptions.preValidation ?
						Array.isArray(controllerOptions.preValidation) ? controllerOptions.preValidation :
						[controllerOptions.preValidation] : [];
					currentPreValidation.push(this.multipartBodyTransformer(this.cloneSchema(schema)));
					controllerOptions.preValidation = currentPreValidation;
				}

				const routeConfiguration = Object.assign(controllerOptions, {
					method: method.httpMethod,
					url,
					handler: controllerMethodHandler,
					schema
				});

				plugin.route(routeConfiguration as any);

				this.log.debug(`Registered http method < ${restController.controller.controller.name} > ${method.httpMethod}  ${url}`);

			}

		}

		// Hook to remove temp files afeter upload

		if (fileConfig.config && fileConfig.config.enabled && !fileConfig.config.keepTempFilesAfterRequest) {
			plugin.addHook('onSend', async request => {
				const req = ((<any>request.raw) as Request);
				if (req.isMultipart && req.multipartTempFiles) {
					await Promise.all(req.multipartTempFiles.map(p => FsUtils.removeFile(p, true)));
				}

			});
		}

		// Add a helper to upload files
		plugin.decorateReply('uploadFile', this.uploadFile);

		done();

	};

	private isModelArray(model: any): model is { isArray: true; model: ClassParameter<any> } {
		return model.isArray !== undefined && model.isArray === true;
	}

	private async handleJwtLogin(request: Request, reply: Response) {

		const payload = await RoutesUtils.jwtLoginFn(request, reply);

		if (payload === null || payload === undefined) {
			throw new Error('Invalid credentials');
		}

		if (this.jwtConfiguration.expiration !== undefined) {
			payload['exp'] = ((new Date()).getTime() / 1000) + this.jwtConfiguration.expiration;
		}
		const token = encode(payload, this.jwtConfiguration.privateKey, this.jwtConfiguration.algorithm);
		reply.send({ token });

	}

	private async verifyJwt(request: Request, response: Response) {

		const token = request.headers['authorization'] || request.headers['Authorization'];
		if (ValidatorUtils.isBlank(token)) {
			throw new Error('No JWT Token found in header "Authorization"');
		}
		const splitedToken = token.split(' ');
		if (splitedToken.length < 2 || splitedToken.length > 2 || splitedToken[0] !== 'Bearer') {
			throw new Error('Invalid value of header "Authorization", it should be: "Bearer xxxxx"');
		}
		const jwt = splitedToken[1];
		const jwtPayload = decode(jwt, this.jwtConfiguration.privateKey, undefined, this.jwtConfiguration.algorithm);

		request.jwtPayload = jwtPayload;

		if (RoutesUtils.jwtPreHandleFn) {
			await RoutesUtils.jwtPreHandleFn(request, response);
		}

	}

	private async verifyUserAndPassword(request: Request, respose: Response) {

		const token = request.headers['authorization'] || request.headers['Authorization'];
		if (ValidatorUtils.isBlank(token)) {
			respose.header('WWW-Authenticate', 'Basic realm="Access to the server", charset="UTF-8"');
			throw new Error('Empty value of header "Authorization", it should be: "Basic xxxxx"');
		}
		const splitedToken = token.split(' ');
		if (splitedToken.length < 2 || splitedToken.length > 2 || splitedToken[0] !== 'Basic') {
			throw new Error('Invalid value of header "Authorization", it should be: "Basic xxxxx"');
		}

		const userAndPassword = Buffer.from(splitedToken[1], 'base64').toString('utf8');
		const userAndPasswordSplited = userAndPassword.split(':');
		if (userAndPasswordSplited.length !== 2) {
			throw new Error('Invalid basic auth value, it should be: "xxx:yyy"');
		}

		const result = await RoutesUtils.basicAuthLoginFn(userAndPasswordSplited[0], userAndPasswordSplited[1], request, respose);
		if (!result) {
			throw new Error('Invalid credentials');
		}

	}

	private async customAuth(request: Request, respose: Response) {

		// The custom auth takes care of throwing errors
		await RoutesUtils.customAuthFn(request, respose);

	}

	private createFromRouteSchemas(httpMethod: HTTPMethods, routeSchemas: IRouteSchemas, schema?: FastifySchema) {

		const result = this.cloneSchema(schema || {});

		if (httpMethod !== 'GET' && routeSchemas.request) {
			result.body = this.isModelArray(routeSchemas.request) ?
				ObjectValidatorUtils.generateJsonSchema(routeSchemas.request.model, { asArray: true }) :
				ObjectValidatorUtils.generateJsonSchema(routeSchemas.request);

			// Check if we have to change some fiel fields as type = 'file'
			const bodySchema = (result.body as any);
			if (bodySchema && bodySchema.type === 'object' && bodySchema.properties) {
				for (const property of Object.keys(bodySchema.properties)) {
					const objProperty = bodySchema.properties[property];
					if (TypeChecker.isObject(objProperty) && objProperty.title === FileField.name) {
						bodySchema.properties[property] = <any>{ type: 'object', isFileType: true };
					} else if (
						TypeChecker.isObject(objProperty) && objProperty.type === 'array' &&
						objProperty.items && TypeChecker.isObject(objProperty.items) &&
						!TypeChecker.isArray(objProperty.items) && objProperty.items.title === FileField.name
					) {
						objProperty.items = <any>{ type: 'object', isFileType: true };
					}
				}
			}
		}
		if (routeSchemas.response) {
			result.response = {
				200: this.isModelArray(routeSchemas.response) ?
					ObjectValidatorUtils.generateJsonSchema(routeSchemas.response.model, { asArray: true }) :
					ObjectValidatorUtils.generateJsonSchema(routeSchemas.response),
				400: ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel),
				500: ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel)
			};
		}
		if (routeSchemas.query) {
			result.querystring = ObjectValidatorUtils.generateJsonSchema(routeSchemas.query);
		}
		if (routeSchemas.urlParameters) {
			result.params = ObjectValidatorUtils.generateJsonSchema(routeSchemas.urlParameters);
		}
		if (routeSchemas.headers) {
			result.headers = ObjectValidatorUtils.generateJsonSchema(routeSchemas.headers);
		}
		if (routeSchemas.tags) {
			result.tags = routeSchemas.tags;
		}
		if (routeSchemas.hide) {
			result.hide = routeSchemas.hide;
		}
		if (routeSchemas.description) {
			result.description = routeSchemas.description;
		}
		if (routeSchemas.summary) {
			result.summary = routeSchemas.summary;
		}
		if (routeSchemas.consumes) {
			result.consumes = routeSchemas.consumes;
		}
		if (routeSchemas.produces) {
			result.produces = routeSchemas.produces;
		}
		if (routeSchemas.security) {
			result.security = routeSchemas.security;
		}
		if (routeSchemas.operationId) {
			result.operationId = routeSchemas.operationId;
		}

		return result;

	}

	private multipartBodyTransformer(schema: FastifySchema) {
		return async (request: Request) => {

			const bodySchema = (schema.body as any);
			if (request.body && bodySchema && bodySchema.type === 'object' && bodySchema.properties) {

				for (const bodyProperty of Object.keys(bodySchema.properties)) {

					const currentValue = request.body[bodyProperty];
					const propertySchema = bodySchema.properties[bodyProperty];

					if (!TypeChecker.isBoolean(propertySchema) && currentValue !== undefined && currentValue !== null) {

						if (propertySchema.type === 'string') {
							request.body[bodyProperty] = `${currentValue[0]}`;
						} else if (propertySchema.type === 'boolean') {
							request.body[bodyProperty] = currentValue[0] === 'true' || currentValue[0] === true;
						} else if (propertySchema.type === 'integer' || propertySchema.type === 'number') {
							request.body[bodyProperty] = parseInt(currentValue[0], 10);
						} else if (propertySchema.type === 'object') {
							request.body[bodyProperty] = currentValue[0];
						} else if (propertySchema.type === 'null') {
							request.body[bodyProperty] = null;
						} else if (propertySchema.type === 'array') {
							const arrayType = propertySchema.items ? TypeChecker.isObject(propertySchema.items) ?
								!TypeChecker.isArray(propertySchema.items) ? propertySchema.items.type :
								undefined : undefined : undefined;
							if (arrayType === 'string') {
								request.body[bodyProperty] = currentValue.map((v: any) => `${v}`);
							} else if (arrayType === 'boolean') {
								request.body[bodyProperty] = currentValue.map((v: any) => v === 'true' || v === true);
							} else if (arrayType === 'integer' || arrayType === 'number') {
								request.body[bodyProperty] = currentValue.map((v: any) => parseInt(v, 10));
							}
						}

					}

				}

			}

		};
	}

	private multipartImpl:
		(config?: FileUploadWebConfiguration) => FastifyContentTypeParser =
		(config) => (request: FastifyRequest, payload: RawRequestDefaultExpression, done: ContentTypeParserDoneFunction) =>
	{
		const body: any = {};
		const multipartTempFiles: string[] = [];
		const basePath = config ? config.enabled ? (config.tempFilesPath || __dirname) : __dirname : __dirname;

		try {

			const stream = new Busboy({
				headers: request.headers,
				limits: config ? config.limits : undefined
			});

			request.raw.on('error', (err: any) => {
				stream.end();
				done(err);
			});

			stream.on('finish', () => done(null, body));
			stream.on('fieldsLimit', (error: any) => {
				stream.end();
				done(error);
			});
			stream.on('filesLimit', (error: any) => {
				stream.end();
				done(error);
			});
			stream.on('partsLimit', (error: any) => {
				stream.end();
				done(error);
			});
			stream.on('error', (error: any) => {
				stream.end();
				done(error);
			});

			const cacheFiles: Record<string, string[]> = {};

			stream.on('field', (fieldname, val) => {
				if (!body[fieldname]) {
					body[fieldname] = [];
				}
				if (val !== null && val !== undefined && (
					(typeof val === 'string' && val.length > 0) ||
					typeof val !== 'string'
				)) {
					body[fieldname].push(val);
				}
			});

			stream.on('file', (field, file, fileName, encoding, mimetype) => {

				try {

					if (cacheFiles[field] && cacheFiles[field].includes(fileName)) {
						cacheFiles[field].push(fileName);
					}

					const filePath = join(basePath, `${this.uuidv4()}-${fileName}`);
					const fileStream = createWriteStream(filePath);
					file.pipe(fileStream).on('error', error => {
						stream.end();
						done(error);
					});
					multipartTempFiles.push(filePath);

					if (!body[field]) {
						body[field] = [];
					}
					body[field].push({ fileName, encoding, mimetype, filePath });

					file.on('error', error => {
						stream.end();
						done(error);
					});

				} catch (error) {
					stream.end();
					done(error);
				}
			});

			(<any>request).isMultipart = true;
			(<any>request).multipartTempFiles = multipartTempFiles;

			request.raw.pipe(stream);

		} catch (error) {
			done(error);
		}

	};

	// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid/2117523#2117523
	private uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	private cloneSchema(schema: FastifySchema) {
		return JSON.parse(JSON.stringify(schema));
	}

	private uploadFile(rs: ReadStream, fileName: string, mimeType: string) {
		const reply: Response = (<any>this);
		reply.header('Content-Disposition', `attachment; filename="${fileName}"`);
		reply.type(mimeType);
		return rs;
	}

}
