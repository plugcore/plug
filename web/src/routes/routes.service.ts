import { Inject, Logger, ObjectUtils, ProjectConfiguration, Service } from '@plugdata/core';
import * as fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { WebConfiguration } from '../configuration/configuration.default';
import { TWebConfugration } from '../configuration/configuration.insterfaces';

@Service()
export class RoutesService {
	
	public fastifyInstance: FastifyInstance<Server, IncomingMessage, ServerResponse>;
	public httpPort: number;
	public addressListenning: string;

	constructor(
		private log: Logger,
		@Inject({ sId: ProjectConfiguration }) configuration: TWebConfugration
	) {

		// Port
		this.httpPort = (configuration.web && configuration.web.port) ?
			configuration.web.port : WebConfiguration.default.web.port;

		// Fastify configuration
		const webCfg = ObjectUtils.deepClone(configuration.web || {});
		webCfg.port = undefined;

		// Fastify initialization
		this.fastifyInstance = fastify(webCfg);

	}

	public async startHttpServer() {
		this.addressListenning = await this.fastifyInstance.listen(this.httpPort);
		this.log.info('Listening server on ' + this.addressListenning);
	}

	public async shutdownHttpServer() {
		await this.fastifyInstance.close();
	}

}
