import { DataSource } from '../data-source/data-source.decorators';
import { InjectConnection } from '../dependecy-injection/di.decorators';
import { InjectConfiguration } from '../configuration/configuration.decorators';
import { Configuration } from '../configuration/configuration.interfaces';
import { HttpDsConfiguration } from './http.configuration';
import { HttpCall, HttpCallOptions } from './http.shared';
import { HttpUtils } from './http.utils';
import { Logger } from '../logs/logger';

@DataSource({ type: 'http' })
export class HttpDatasource {

	private httpConfiguration: HttpDsConfiguration;
	private httpCall: HttpCall;
	private baseUrl: string;

	constructor(
		@InjectConfiguration() private configuration: Configuration,
		private log: Logger,
		@InjectConnection() private connection?: string
	) {
		if (this.connection) {
			this.httpConfiguration = this.configuration.getConnectionConfiguration(
				HttpDsConfiguration, this.connection);
			const isHttps = /^https:\/\/.*$/.test(this.httpConfiguration.url);
			this.httpCall = isHttps ? HttpUtils.httpsCall.bind(HttpUtils) : HttpUtils.httpCall.bind(HttpUtils);
			this.baseUrl = this.httpConfiguration.url;
		}
	}


	public get<T>(path: string, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'GET';
		this.log.debug(`HTTP ${funcOpts.method} call to ` + url);
		return this.httpCall(url, funcOpts);
	}

	public post<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'POST';
		this.log.debug(`HTTP ${funcOpts.method} call to ` + url);
		return this.httpCall(url, funcOpts, body);
	}

	public put<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'PUT';
		this.log.debug(`HTTP ${funcOpts.method} call to ` + url);
		return this.httpCall(url, funcOpts, body);
	}

	public patch<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'PATCH';
		this.log.debug(`HTTP ${funcOpts.method} call to ` + url);
		return this.httpCall(url, funcOpts, body);
	}

	public delete<T>(path: string, body?: any, options?: Omit<HttpCallOptions, 'method'>): Promise<T> {
		const url = this.resolveURL(path);
		const funcOpts: HttpCallOptions = options || {};
		funcOpts.method = 'DELETE';
		this.log.debug(`HTTP ${funcOpts.method} call to ` + url);
		return this.httpCall(url, funcOpts, body);
	}

	//
	// Private methods
	//

	/**
	 * Creates a valid url Object to make the http call
	 */
	private resolveURL(path: string): URL {
		return new URL(this.baseUrl + path);
	}

}
