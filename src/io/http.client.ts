import { URL } from 'url';
import { HttpUtils } from './http.utils';

export class HttpClient {

	private domain: string;

	constructor(domain: string) {
		this.domain = domain;
	}

	public get<T>(url: string, params?: any): Promise<T> {

		const options = this.resolveURL(url);
		return HttpUtils.call<T>(options, params ? params : {});
	}

	public post<T>(url: string, params?: any, body?: any): Promise<T> {

		const options = this.resolveURL(url);
		return HttpUtils.call<T>(options, params ? params : {}, body ? body : {});
	}

	private resolveURL(url: string): URL {

		return new URL(url, this.domain);
	}

}
