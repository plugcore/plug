import { ArrayUtils, Container, Logger, OnEvent, PublicEvents, Service, ObjectValidatorUtils } from '@plugdata/core';
import * as oas from 'fastify-oas';
import { RoutesService } from './routes.service';
import { TRequestHandler, ErrorResponse } from './routes.shared';
import { RoutesUtils } from './routes.utils';
import { RouteSchema } from 'fastify';

@Service()
export class RoutesInitializer {

	private readonly eventNames = ['onRequest', 'preParsing', 'preValidation', 'preHandler', 'preSerialization'];
	private readonly contetTypeJson = 'application/json';

	constructor(
		private log: Logger,
		private routesService: RoutesService
	) {

		// OAS configuration
		this.routesService.fastifyInstance.register(oas, {
			routePrefix: '/plug-documentation',
			exposeRoute: true,
			addModels: true,
			swagger: {
				info: {},
				servers: [{ url: 'http://127.0.0.1:3000' }],
				consumes: [this.contetTypeJson],
				produces: [this.contetTypeJson],
			}
		});

		// Documentation route
		/* this.routesService.fastifyInstance.route({
			method: 'GET',
			url: '/plug-documentation/json',
			handler: (request, reply) => { reply.send(this.routesService.fastifyInstance.oas()); },
			schema: { hide: true }
		}); */

	}

	@OnEvent(PublicEvents.allServicesLoaded)
	public onServicesReady() {
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
			const controllerService = await Container.get<any>(serviceId, context);
			const methods = RoutesUtils.getRegisteredMethods(controller.controller);

			// 2: Attach al controller methods to fastify methods
			for (const method of methods) {

				const controllerMethodHandler: TRequestHandler = controllerService[method.methodName];
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
				const routeValidation = controllerOptions.routeValidation;
				const schema: RouteSchema = controllerOptions.schema || {};
				if (routeValidation) {

					if (method.httpMethod !== 'GET' && routeValidation.request) {
						schema.body = ObjectValidatorUtils.generateJsonSchema(routeValidation.request);
					}
					if (routeValidation.response) {
						schema.response = {
							200: ObjectValidatorUtils.generateJsonSchema(routeValidation.response),
							400: ObjectValidatorUtils.generateJsonSchema(ErrorResponse)
						};
					}
					if (routeValidation.parameters) {
						schema.querystring = ObjectValidatorUtils.generateJsonSchema(routeValidation.parameters);
					}
					if (routeValidation.headers) {
						schema.headers = ObjectValidatorUtils.generateJsonSchema(routeValidation.headers);
					}
					controllerOptions.schema = schema;

				}
				controllerOptions.routeValidation = undefined;

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

}
