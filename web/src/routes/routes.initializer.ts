import {
	ArrayUtils, ClassParameter, Container, Logger, ObjectUtils, ObjectValidatorUtils,
	OnEvent, PublicEvents, Service, InjectLogger, Configuration, InjectConfiguration
} from '@plugdata/core';
import { RouteSchema } from 'fastify';
import * as oas from 'fastify-oas';
import { WebConfiguration } from '../configuration/configuration.default';
import { RoutesService } from './routes.service';
import { ErrorResponseModel, TRequestHandler } from './routes.shared';
import { RoutesUtils } from './routes.utils';

@Service()
export class RoutesInitializer {

	private readonly eventNames = ['onRequest', 'preParsing', 'preValidation', 'preHandler', 'preSerialization'];

	constructor(
		@InjectLogger('httpcontroller') private log: Logger,
		private routesService: RoutesService,
		@InjectConfiguration() configuration: Configuration
	) {

		// OAS configuration

		const defaultServers = { servers: [{ url: `http://${this.routesService.host}:${this.routesService.httpPort}` }] };
		const defaultConfiguration = ObjectUtils.deepMerge(WebConfiguration.default.web.oas, defaultServers);
		const oasConfiguration = (configuration.web && configuration.web.oas) ?
			ObjectUtils.deepMerge(defaultConfiguration, configuration.web.oas) : defaultConfiguration;
		this.routesService.fastifyInstance.register(oas, {
			exposeRoute: false,
			addModels: true,
			swagger: oasConfiguration
		});

		// Documentation route
		this.routesService.fastifyInstance.route({
			method: 'GET',
			url: '/api-documentation.json',
			handler: (request, reply) => { reply.send(this.routesService.fastifyInstance.oas()); },
			schema: { hide: true }
		});

	}

	@OnEvent(PublicEvents.allServicesLoaded)
	public onServicesReady() {
		this.log.debug('All services loaded, starting http server...');
		this.initHttpServer().then();
	}

	public async initHttpServer() {
		const controllers = RoutesUtils.getAllControllers();
		await Promise.all(controllers.map(async controller => {

			// 1: Get service from di container
			const serviceId = (controller.options && controller.options.service && controller.options.service.sId) ?
				controller.options.service.sId : controller.controller;
			const context = (controller.options && controller.options.service && controller.options.service.ctx) ?
				controller.options.service.ctx : undefined;
			const controllerService = await Container.get<any>(serviceId, undefined, context);
			const methods = RoutesUtils.getRegisteredMethods(controller.controller);

			// 2: Attach all controller methods to fastify methods
			for (const method of methods) {

				const controllerMethodHandler: TRequestHandler = controllerService[method.methodName].bind(controllerService);
				const controllerOptions = method.options || {};
				const url = controller.options.urlBase + (method.path || '');

				// Check all events, since they can be names of custom functions of the service
				// and not stand alone functions.
				if (ArrayUtils.someContentsAreTheSame(Object.keys(controllerOptions), this.eventNames)) {
					for (const eventName of this.eventNames) {
						const possibleEventFunction = (<Record<string, any>>controllerOptions)[eventName];
						if (possibleEventFunction && typeof possibleEventFunction === 'function') {
							const functName = possibleEventFunction.name;
							if (controller.controller.prototype[functName] === possibleEventFunction) {
								(<Record<string, any>>controllerOptions)[eventName] =
									controllerService[functName].bind(controllerService);
							}
						}
					}
				}

				// Route validations
				const routeSchemas = controllerOptions.routeSchemas;
				const schema: RouteSchema = controllerOptions.schema || {};
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
					if (routeSchemas.parameters) {
						schema.querystring = ObjectValidatorUtils.generateJsonSchema(routeSchemas.parameters);
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

				const routeConfiguration = Object.assign(controllerOptions, {
					method: method.httpMethod,
					url,
					handler: controllerMethodHandler
				});

				// TODO: See what we can do to improve this type with custom
				// events such as onRequest that have been overriden
				this.routesService.fastifyInstance.route(<any>routeConfiguration);

				this.log.debug(`Registered http method < ${controller.controller.name} > ${method.httpMethod}  ${url}`);

			}

		}));

		await this.routesService.startHttpServer();


	}

	private isModelArray(model: any): model is { isArray: true; model: ClassParameter<any> } {
		return model.isArray !== undefined && model.isArray === true;
	}

}
