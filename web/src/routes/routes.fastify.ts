import * as http from 'http';

// Extends fastify types
declare module 'fastify' {
	interface FastifyInstance<
		HttpServer = http.Server,
		HttpRequest = http.IncomingMessage,
		HttpResponse = http.ServerResponse
	> {
		auth(inp: any[]): any;
		verifyJwt: any;
		verifyUserAndPassword: any;
	}
}
