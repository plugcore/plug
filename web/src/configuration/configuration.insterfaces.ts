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
}

declare module '@plugdata/core' {
	export interface IConfiguration<T> {
		web?: PlugWebConfiguration;
	}
	export class ProjectConfiguration<T = undefined> implements IConfiguration<T> {
		web?: PlugWebConfiguration;
	}
}
