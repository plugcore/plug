/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { RequestOptions as HttpRequestOptions } from 'http';
import { RequestOptions as HttpsRequestOptions } from 'https';
import { Omit } from '../utils/typescript.utils';

export interface HttpCallOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	params?: Record<string, any>;
	headers?: HttpRequestOptions['headers'];
	options?: Omit<HttpRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
}

export interface HttpsCallOptions extends HttpCallOptions {
	options?: Omit<HttpsRequestOptions, 'method' | 'path' | 'headers' | 'hostname' | 'protocol'>;
}
