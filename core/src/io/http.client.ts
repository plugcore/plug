/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { URL } from 'url';
import { Omit } from '../utils/typescript.utils';
import { HttpCallOptions } from './http.shared';
import { HttpUtils } from './http.utils';

export class HttpClient {

	private domain: string;

	constructor(domain: string) {
		this.domain = domain.replace(/(^\w+:|^)\/\//, '');
	}

	public get<T>(path: string, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'GET';
		return HttpUtils.httpCall(url, funcOpts);
	}

	public post<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'POST';
		return HttpUtils.httpCall(url, funcOpts, body);
	}

	public put<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'PUT';
		return HttpUtils.httpCall(url, funcOpts, body);
	}

	public patch<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'PATCH';
		return HttpUtils.httpCall(url, funcOpts, body);
	}

	public delete<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'DELETE';
		return HttpUtils.httpCall(url, funcOpts, body);
	}

	private resolveURL(path: string): URL {
		return new URL('http://' + this.domain + path);
	}

}
