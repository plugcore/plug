import * as http from 'http';
import * as fastify from 'fastify';

// Extends fastify types
declare module 'fastify' {

	interface CookieSerializeOptions {
		domain?: string;
		encode?(val: string): string;
		expires?: Date;
		httpOnly?: boolean;
		maxAge?: number;
		path?: string;
		sameSite?: boolean | 'lax' | 'strict' | 'none';
		secure?: boolean;
		signed?: boolean;
	}

	interface FastifyRequest<
		HttpRequest,
		Query = fastify.DefaultQuery,
		Params = fastify.DefaultParams,
		Headers = fastify.DefaultHeaders,
		Body = any
	> {
		/**
		 * Request cookies
		 */
		cookies: { [cookieName: string]: string };
	}

	interface FastifyInstance<
		HttpServer = http.Server,
		HttpRequest = http.IncomingMessage,
		HttpResponse = http.ServerResponse
	> {
		auth(inp: any[]): any;
		verifyJwt: any;
		verifyUserAndPassword: any;
		customAuth: any;
	}
	interface FastifyReply<HttpResponse> {
		/**
		 * Set response cookie
		 * @param name Cookie name
		 * @param value Cookie value
		 * @param options Serialize options
		 */
		setCookie(
			name: string,
			value: string,
			options?: CookieSerializeOptions
		): fastify.FastifyReply<HttpResponse>;

		/**
		 * clear response cookie
		 * @param name Cookie name
		 * @param options Serialize options
		 */
		clearCookie(
			name: string,
			options?: CookieSerializeOptions
		): fastify.FastifyReply<HttpResponse>;
	}
}
