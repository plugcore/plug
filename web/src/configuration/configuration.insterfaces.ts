import {
	ComponentsObject, ExternalDocumentationObject, InfoObject, SchemasObject,
	SecurityRequirementObject, Server, TagObject
} from 'openapi3-ts';

export type JwtAvailableAlgorithms = 'HS256' | 'HS384' | 'HS512' | 'RS256';
export type SupportedSecurityTypes = 'basic' | 'jwt' | 'custom' | 'none';

export interface WebOasConfiguration {
	enableDocumentation?: boolean;
	documentationPath?: string;
	info?: InfoObject;
	externalDocs?: ExternalDocumentationObject;
	host?: string;
	basePath?: string;
	schemes?: SchemasObject | string[];
	consumes?: string[];
	produces?: string[];
	security?: Record<string, any> | SecurityRequirementObject[];
	servers?: Server[];
	components?: ComponentsObject;
	tags?: TagObject[];
}

export interface WebAuthConfiguration {
	eanbled?: boolean;
	securityInAllRoutes?: SupportedSecurityTypes | SupportedSecurityTypes[];
	securityInOas?: SupportedSecurityTypes | SupportedSecurityTypes[];
	jwtPrivateKey?: string;
	jwtAlgorithm?: JwtAvailableAlgorithms;
	jwtLoginPath?: string;
	jwtExpiration?: number;
}

export interface FileUploadWebConfiguration {
	limits?: {
		/** Max field name size (in bytes) (Default: 100 bytes) */
		fieldNameSize?: number;
		/** Max field value size (in bytes) (Default: 1MB). */
		fieldSize?: number;
		/** Max number of non-file fields (Default: Infinity). */
		fields?: number;
		/** For multipart forms, the max file size (in bytes) (Default: Infinity). */
		fileSize?: number;
		/** For multipart forms, the max number of file fields (Default: Infinity). */
		files?: number;
		/** For multipart forms, the max number of parts (fields + files) (Default: Infinity). */
		parts?: number;
		/** For multipart forms, the max number of header key=>value pairs to parse Default: 2000 (same as node's http). */
		headerPairs?: number;
	};
	/** Enables multipart content type */
	enabled?: boolean;
	/** All files will be stored in a temporal file before the route handler, this field let's you indicate where to store it */
	tempFilesPath?: string;
	/** After all multipart request, all temporal files will be deleted unless this is set to true */
	keepTempFilesAfterRequest?: boolean;
}

export interface PlugWebConfiguration {
	server?: {
		port: number;
		host?: string
	};
	oas?: WebOasConfiguration;
	auth?: WebAuthConfiguration;
	fileUpload?: FileUploadWebConfiguration;
}

declare module '@plugcore/core/types/src/configuration/configuration.interfaces' {
	interface Configuration {
		web?: PlugWebConfiguration;
	}
}
