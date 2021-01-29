import { Service } from "@plugcore/core";
import { FastifyInstance } from "fastify";
import { FastifyConfiguration } from "../../../src/routes/routes.decorators";

@Service()
export class FastifyConfigurationExample {

	public fastifyRegsitered = false;

	@FastifyConfiguration()
	public async fastifyConfiguration(fastifyIstance: FastifyInstance) {

		fastifyIstance.register((fastify, configuration, done) => {

			this.fastifyRegsitered = true;

			done();

		});

	}

}
