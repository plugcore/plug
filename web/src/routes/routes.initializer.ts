import { IncomingMessage, Server, ServerResponse } from 'http';
import {
	ArrayUtils, ClassParameter, Configuration, Container, InjectConfiguration,
	InjectLogger, Logger, ObjectUtils, ObjectValidatorUtils, OnEvent,
	PublicEvents, Service, ValidatorUtils
} from '@plugcore/core';
import { RouteSchema, Plugin } from 'fastify';
import * as fastifyAuth from 'fastify-auth';
import * as oas from 'fastify-oas';
import * as fstatic from 'fastify-static';
import * as cookies from 'fastify-cookie';
import { decode, encode } from 'jwt-simple';
import { WebConfiguration } from '../configuration/configuration.default';
import { JwtAvailableAlgorithms, WebOasConfiguration } from '../configuration/configuration.insterfaces';
import { RoutesService } from './routes.service';
import { ErrorResponseModel, Request, Response, TMethodOptions, IRegisteredController } from './routes.shared';
import { RoutesUtils } from './routes.utils';
import { join } from 'path';

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

	constructor(
		@InjectLogger('httpcontroller') private log: Logger,
		private routesService: RoutesService,
		@InjectConfiguration() private configuration: Configuration
	) {

		this.securityEnabled = configuration.web && configuration.web.auth && configuration.web.auth.eanbled || false;

		this.oasDocumentationPath = (
			configuration.web && configuration.web.oas && configuration.web.oas.documentationPath
		) || WebConfiguration.default.web.oas.documentationPath || '/api/documentation';

	}

	@OnEvent(PublicEvents.allServicesLoaded)
	public onServicesReady() {
		this.log.debug('All services loaded, starting http server...');
		this.initHttpServer().then();
	}

	public async initHttpServer() {

		const restControllers = await Promise.all(this.getMethodsServices());

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
				.register(fastifyAuth)
				// Auth routes
				.register(this.authPlugin.bind(this));
		}

		this.routesService.fastifyInstance
			// OAS
			.register(this.oasPlugin(restControllers), { prefix: this.oasDocumentationPath })
			// Cookies support
			.register(cookies)
			// Custom routes
			.register(this.methodsPlugin(restControllers));

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

	private authPlugin: Plugin<Server, IncomingMessage, ServerResponse, fastifyAuth.Options> = (plugin, _, done) => {

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
				schema: { hide: true }
			});

		}

		done();

	};

	private oasPlugin: (restControllers: {
		controllerService: any;
		controller: IRegisteredController;
	}[]) => Plugin<Server, IncomingMessage, ServerResponse, fastifyAuth.Options> = (restControllers) => (plugin, _, done) => {

		// OAS configuration

		const defaultServers = { servers: [{ url: `http://${this.routesService.host}:${this.routesService.httpPort}` }] };
		const defaultConfiguration = ObjectUtils.deepMerge(ObjectUtils.deepClone(WebConfiguration.default.web.oas), defaultServers);
		const oasConfiguration: WebOasConfiguration = (this.configuration.web && this.configuration.web.oas) ?
			ObjectUtils.deepMerge(defaultConfiguration, this.configuration.web.oas) : defaultConfiguration;
		const oasSecurity = this.configuration.web && this.configuration.web.auth && this.configuration.web.auth.securityInOas;
		const securityHamdlers: any[] = [];

		if (!oasConfiguration.enableDocumentation) {
			done();
			return;
		}

		if (this.securityEnabled && oasSecurity) {

			// Create security handlers
			if (oasSecurity.includes('jwt')) {
				securityHamdlers.push(plugin.verifyJwt);
			}
			if (oasSecurity.includes('basic')) {
				securityHamdlers.push(plugin.verifyUserAndPassword);
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
			const oasSecuritySchema: Record<string, any>[] = [];

			for (const securityType of possibleSecurityTypes) {

				if (securityType === 'basic') {
					oasSecuritySchema.push({
						BasicAuth: { type: 'http', scheme: 'basic' }
					});
				}
				if (securityType === 'jwt') {
					oasSecuritySchema.push({
						JWTBearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
					});
				}

			}

			if (oasSecuritySchema.length > 0) {
				const compoenets = oasConfiguration.components || {};
				// TODO Remove any
				compoenets.securitySchemes = <any>oasSecuritySchema;
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
			schema: { hide: true },
			preHandler: securityHamdlers.length > 0 ? plugin.auth(securityHamdlers) : undefined,
			handler: (_, reply) => {
				reply.redirect(this.oasDocumentationPath + '/index.html');
			}
		});

		plugin.route({
			url: '/json',
			method: 'GET',
			schema: { hide: true },
			preHandler: securityHamdlers.length > 0 ? plugin.auth(securityHamdlers) : undefined,
			handler: (_, reply) => {
				reply.send(plugin.oas());
			},
		});

		plugin.route({
			url: '/yaml',
			method: 'GET',
			schema: { hide: true },
			preHandler: securityHamdlers.length > 0 ? plugin.auth(securityHamdlers) : undefined,
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

	private methodsPlugin: (restControllers: {
		controllerService: any;
		controller: IRegisteredController;
	}[]) => Plugin<Server, IncomingMessage, ServerResponse, fastifyAuth.Options> = (restControllers) => (plugin, _, done) => {

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
				const controllerOptions: TMethodOptions = method.options || {};
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
				const schema: RouteSchema = controllerOptions.schema || {};

				// Route validations
				if (routeSchemas) {

					if (method.httpMethod !== 'GET' && routeSchemas.request) {
						schema.body = this.isModelArray(routeSchemas.request) ?
							ObjectValidatorUtils.generateJsonSchema(routeSchemas.request.model, { asArray: true }) :
							ObjectValidatorUtils.generateJsonSchema(routeSchemas.request);
					}
					if (routeSchemas.response) {
						schema.response = {
							200: this.isModelArray(routeSchemas.response) ?
								ObjectValidatorUtils.generateJsonSchema(routeSchemas.response.model, { asArray: true }) :
								ObjectValidatorUtils.generateJsonSchema(routeSchemas.response),
							400: ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel),
							500: ObjectValidatorUtils.generateJsonSchema(ErrorResponseModel)
						};
					}
					if (routeSchemas.query) {
						schema.querystring = ObjectValidatorUtils.generateJsonSchema(routeSchemas.query);
					}
					if (routeSchemas.urlParameters) {
						schema.params = ObjectValidatorUtils.generateJsonSchema(routeSchemas.urlParameters);
					}
					if (routeSchemas.headers) {
						schema.headers = ObjectValidatorUtils.generateJsonSchema(routeSchemas.headers);
					}

					controllerOptions.schema = schema;

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
					const routeSecurity = [];
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

					if (regexAuth.length > 0) {
						const headerSchema: Record<string, any> = schema.headers || {
							type: 'object',
							properties: {}
						};
						const properties = headerSchema.properties || <any>{};
						if (!properties.Authorization) {
							properties.Authentication = {
								type: 'string',
								pattern: `^(${regexAuth.join('|')}) .*$`
							};
						}
						schema.headers = headerSchema;
					}

					controllerOptions.schema = schema;

				}

				// Check if we have to put some securty
				if (securityOnAllRoutes.length > 0 || controllerOptions.security) {
					const currentPreHandlers = controllerOptions.preHandler ?
						Array.isArray(controllerOptions.preHandler) ? controllerOptions.preHandler : [controllerOptions.preHandler] : [];
					const securityTypes = Array.isArray(controllerOptions.security) ? controllerOptions.security : [controllerOptions.security];
					const securityHamdlers: any[] = [];

					if (securityOnAllRoutes.includes('jwt') || securityTypes.includes('jwt')) {
						securityHamdlers.push(plugin.verifyJwt);
					}
					if (securityOnAllRoutes.includes('basic') || securityTypes.includes('basic')) {
						securityHamdlers.push(plugin.verifyUserAndPassword);
					}
					if (securityOnAllRoutes.includes('custom') || securityTypes.includes('custom')) {
						securityHamdlers.push(plugin.customAuth);
					}

					if (
						!(securityTypes.length === 1 && securityTypes[0] === 'none') &&
						securityHamdlers.length > 0 && this.securityEnabled
					) {
						// TODO, remove <any>
						controllerOptions.preHandler = <any>currentPreHandlers.concat(plugin.auth(
							securityHamdlers
						));
					}

				}

				const routeConfiguration = Object.assign(controllerOptions, {
					method: method.httpMethod,
					url,
					handler: controllerMethodHandler
				});

				plugin.route(routeConfiguration);

				this.log.debug(`Registered http method < ${restController.controller.controller.name} > ${method.httpMethod}  ${url}`);

			}

		}

		done();

	};

	private isModelArray(model: any): model is { isArray: true; model: ClassParameter<any> } {
		return model.isArray !== undefined && model.isArray === true;
	}

	private async handleJwtLogin(request: Request, reply: Response) {

		const payload = await RoutesUtils.jwtLoginFn(request);

		if (payload === null || payload === undefined) {
			throw new Error('Invalid credentials');
		}

		if (this.jwtConfiguration.expiration !== undefined) {
			payload['exp'] = ((new Date()).getTime() / 1000) + this.jwtConfiguration.expiration;
		}
		const token = encode(payload, this.jwtConfiguration.privateKey, this.jwtConfiguration.algorithm);
		reply.send({ token });

	}

	private async verifyJwt(request: Request) {

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

		const result = await RoutesUtils.basicAuthLoginFn(userAndPasswordSplited[0], userAndPasswordSplited[1], request);
		if (!result) {
			throw new Error('Invalid credentials');
		}

	}

	private async customAuth(request: Request, respose: Response) {

		// The custom auth takes care of throwing errors
		await RoutesUtils.customAuthFn(request, respose);

	}

}
