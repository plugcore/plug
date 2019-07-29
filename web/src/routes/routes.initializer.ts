import { Container, Logger, OnEvent, PublicEvents, Service, Inject, ProjectConfiguration } from '@plugdata/core';
import * as fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { TRequestHandler } from './routes.shared';
import { RoutesUtils } from './routes.utils';
import { TWebConfugration } from '../configuration/configuration.insterfaces';
import { WebConfiguration } from '../configuration/configuration.default';

@Service()
export class RoutesInitializer {

	private fastifyInstance: FastifyInstance<Server, IncomingMessage, ServerResponse>;;
    private httpPort: number;

	constructor(
        private log: Logger,
        @Inject({ sId: ProjectConfiguration }) configuration: TWebConfugration
	) {
        this.fastifyInstance = fastify(configuration.web || {});
        this.httpPort = (configuration.web && configuration.web.port) ?
            configuration.web.port : WebConfiguration.default.web.port;
	}

	@OnEvent(PublicEvents.allServicesLoaded)
	public onServicesReady() {
		this.startHttpServer().then(() => {
			this.log.info(`server listening on ${this.httpPort}`);
		});
	}

	public async startHttpServer() {
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

				const routeConfiguration = Object.assign(controllerOptions, {
					method: method.httpMethod,
					url,
					handler: controllerMethodHandler
				});

				this.fastifyInstance.route(routeConfiguration);

				this.log.debug('Registered controller method at: ' + url);

			}

		}));

		await this.fastifyInstance.listen(this.httpPort);

	}

	public async shutdownHttpServer() {
        await this.fastifyInstance.close();
    }

}
