/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { URL } from 'url';
import { Omit } from '../utils/typescript.utils';
import { HttpsCallOptions } from './http.shared';
import { HttpUtils } from './http.utils';

export class HttpsClient {

	private domain: string;

	constructor(domain: string) {
		this.domain = domain.replace(/(^\w+:|^)\/\//, '');
	}

	public get<T>(path: string, options?: Omit<HttpsCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpsCallOptions = options || {};
		funcOpts.method = 'GET';
		return HttpUtils.httpsCall(url, funcOpts);
	}

	public post<T>(path: string, body?: any, options?: Omit<HttpsCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpsCallOptions = options || {};
		funcOpts.method = 'POST';
		return HttpUtils.httpsCall(url, funcOpts, body);
	}

	public put<T>(path: string, body?: any, options?: Omit<HttpsCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpsCallOptions = options || {};
		funcOpts.method = 'PUT';
		return HttpUtils.httpsCall(url, funcOpts, body);
	}

	public patch<T>(path: string, body?: any, options?: Omit<HttpsCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpsCallOptions = options || {};
		funcOpts.method = 'PATCH';
		return HttpUtils.httpsCall(url, funcOpts, body);
	}

	public delete<T>(path: string, body?: any, options?: Omit<HttpsCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpsCallOptions = options || {};
		funcOpts.method = 'DELETE';
		return HttpUtils.httpsCall(url, funcOpts, body);
	}

	private resolveURL(path: string): URL {
		return new URL('https://' + this.domain + path);
	}

}
