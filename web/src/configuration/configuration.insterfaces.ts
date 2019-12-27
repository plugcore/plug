import { ListenOptions } from 'fastify';
import {
	ComponentsObject, ExternalDocumentationObject, InfoObject, SchemasObject,
	SecurityRequirementObject, Server, TagObject
} from 'openapi3-ts';

export type JwtAvailableAlgorithms = 'HS256' | 'HS384' | 'HS512' | 'RS256';

export interface PlugWebConfiguration {
	server?: ListenOptions;
	oas?: {
		enableDocumentation?: boolean;
		documentationPath?: string;
		info?: InfoObject;
		externalDocs?: ExternalDocumentationObject;
		host?: string;
		basePath?: string;
		schemes?: SchemasObject | string[];
		consumes?: string[];
		produces?: string[];
		security?: SecurityRequirementObject[] | { [securityDefinitionName: string]: string[] }[];
		servers?: Server[];
		components?: ComponentsObject;
		tags?: TagObject[];
	};
	auth?: {
		eanbled?: boolean;
		securityInAllRoutes?: 'basic' | 'jwt' | ('basic' | 'jwt')[];
		securityInOas?: 'basic' | 'jwt' | ('basic' | 'jwt')[];
		jwtPrivateKey?: string;
		jwtAlgorithm?: JwtAvailableAlgorithms;
		jwtLoginPath?: string;
		jwtExpiration?: number;
	};
}

declare module '@plugdata/core/types/src/configuration/configuration.interfaces' {
	interface Configuration {
		web?: PlugWebConfiguration;
	}
}
