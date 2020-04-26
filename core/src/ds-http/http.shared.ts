import { RequestOptions as HttpRequestOptions } from 'http';
import { RequestOptions as HttpsRequestOptions } from 'https';
import { Writable } from 'stream';
import { Omit } from '../utils/typescript.utils';

export interface HttpCallOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	params?: Record<string, any>;
	headers?: HttpRequestOptions['headers'];
	options?: Omit<HttpRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
	contentType?: 'application/json' | 'application/xml' | string;
	responseContentType?: 'application/json' | 'application/xml' | string;
	responseEncoding?: 'utf8' | string;
	responseStream?: Writable;
}

export interface HttpsCallOptions extends HttpCallOptions {
	options?: Omit<HttpsRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
}

export type HttpCall = <T>(url: URL | string, options?: HttpCallOptions, body?: any) => Promise<T>;
