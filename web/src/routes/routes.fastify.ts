import * as fastify from 'fastify';
import { SupportedSecurityTypes } from '../configuration/configuration.insterfaces';

// Extends fastify types
declare module 'fastify' {

	interface CookieSerializeOptions {
		domain?: string;
		encode?(val: string): string;
		expires?: Date;
		httpOnly?: boolean;
		maxAge?: number;
		path?: string;
		secure?: boolean;
		signed?: boolean;
	}

	interface FastifyRequest {
		/**
		 * Request cookies
		 */
		cookies: { [cookieName: string]: string };
	}

	interface FastifySchema {
		security?: any[];
		consumes?: string[]
	}

	interface FastifyInstance {
		auth(inp: any[]): any;
		verifyJwt: any;
		verifyUserAndPassword: any;
		customAuth: any;
	}
	interface FastifyReply {
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
		): fastify.FastifyReply;

		/**
		 * clear response cookie
		 * @param name Cookie name
		 * @param options Serialize options
		 */
		clearCookie(
			name: string,
			options?: CookieSerializeOptions
		): fastify.FastifyReply;
	}
}
