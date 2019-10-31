/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
