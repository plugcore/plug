import { ListenOptions } from 'fastify';
import {
	ComponentsObject, ExternalDocumentationObject, InfoObject, SchemasObject,
	SecurityRequirementObject, Server, TagObject
} from 'openapi3-ts';

export interface PlugWebConfiguration {
	server?: ListenOptions;
	oas?: {
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
		eanbled: boolean;
		type: 'basic' | 'jwt';
		privateKey?: string;
		publickKey?: string;
		jwtAlgorithm?: 'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512';
	};
}

declare module '@plugdata/core/types/src/configuration/configuration.interfaces' {
	interface Configuration {
		web?: PlugWebConfiguration;
	}
}
