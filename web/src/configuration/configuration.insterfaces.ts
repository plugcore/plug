import { ProjectConfiguration } from '@plugdata/core';
import { ListenOptions } from 'fastify';
import {
	ComponentsObject, ExternalDocumentationObject, InfoObject, SchemasObject,
	SecurityRequirementObject, Server, TagObject
} from 'openapi3-ts';

/**
 * Plug framework configuration file
 */
export interface IWebConfiguration {
	web?: {
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
	};
}

export type TWebConfugration = IWebConfiguration & ProjectConfiguration;