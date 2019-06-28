import { URL } from 'url';
import { Omit } from '../utils/typescript.utils';
import { HttpsCallOptions } from './http.shared';
import { HttpUtils } from './http.utils';

export class HttpsClient {

	private domain: string;

	constructor(domain: string) {
		this.domain = domain;
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
