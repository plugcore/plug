import { Inject, Logger, ProjectConfiguration, Service } from '@plugdata/core';
import * as fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { WebConfiguration } from '../configuration/configuration.default';
import { TWebConfugration } from '../configuration/configuration.insterfaces';

@Service()
export class RoutesService {
	
	public fastifyInstance: FastifyInstance<Server, IncomingMessage, ServerResponse>;
	public httpPort: number;
	public host: string;
	public addressListenning: string;

	constructor(
		private log: Logger,
		@Inject({ sId: ProjectConfiguration }) configuration: TWebConfugration
	) {

		// Port
		this.httpPort = (configuration.web && configuration.web.server && configuration.web.server.port) ?
			configuration.web.server.port : WebConfiguration.default.web.server.port;

		// Host
		this.host = (configuration.web && configuration.web.server && configuration.web.server.host) ?
			configuration.web.server.host : WebConfiguration.default.web.server.host;

		// Fastify initialization
		this.fastifyInstance = fastify({
			logger: this.log.pinoOptions
		});

	}

	public async startHttpServer() {
		this.addressListenning = await this.fastifyInstance.listen(this.httpPort);	
	}

	public async shutdownHttpServer() {
		await this.fastifyInstance.close();
	}

}
