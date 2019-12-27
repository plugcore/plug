import { request as httpRequest, RequestOptions as HttpRequestOptions } from 'http';
import { request as httpsRequest, RequestOptions as HttpsRequestOptions } from 'https';
import { Transform } from 'stream';
import { URL, URLSearchParams } from 'url';
import { TypeChecker } from '../utils/type.checker';
import { HttpCallOptions, HttpsCallOptions } from './http.shared';

export class HttpUtils {

	//
	// Public methods
	//

	public static async httpCall<T>(url: URL | string, options?: HttpCallOptions, body?: any): Promise<T> {
		const opts = this.createOptions(url, options, body);
		opts.protocol = 'http:';
		return this.makeCall(opts, body, options ? options.responseEncoding : undefined);
	}

	public static async httpsCall<T>(url: URL | string, options?: HttpsCallOptions, body?: any): Promise<T> {
		const opts = this.createOptions(url, options, body);
		opts.protocol = 'https:';
		return this.makeCall(opts, body, options ? options.responseEncoding : undefined);
	}

	//
	// Private methods
	//

	private static createOptions<T extends HttpCallOptions | HttpsCallOptions>(
		url: URL | string, options?: T, body?: any
	): T extends HttpCallOptions ? HttpRequestOptions : HttpsRequestOptions {

		const opts: T extends HttpCallOptions ? HttpRequestOptions : HttpsRequestOptions = <any>(options ? options.options || {} : {});
		const callUrl = TypeChecker.isString(url) ? new URL(url) : url;

		if (options && options.params && Object.keys(options.params).length > 0) {
			const queryParams = new URLSearchParams(options.params);
			callUrl.search = queryParams.toString();
		}

		opts.hostname = callUrl.hostname;
		opts.port = callUrl.port;
		opts.path = callUrl.pathname + (callUrl.search ? callUrl.search : '');

		if (options) {
			opts.headers = options.headers;
			opts.method = options.method;
		}

		opts.headers = opts.headers || {};
		if (options && options.contentType) {
			opts.headers['Content-Type'] = options.contentType;
		} else if (body !== undefined) {
			opts.headers['Content-Type'] = 'application/json';
		}

		if (options && options.responseContentType) {
			opts.headers['Accept'] = options.responseContentType;
		} else {
			opts.headers['Accept'] = 'application/json';
		}

		return opts;
	}

	private static makeCall<T>(opts: HttpRequestOptions | HttpsRequestOptions, body?: any, responseEncoding?: string): Promise<T> {

		return new Promise<T>((resolve, reject) => {
			try {

				const headers = opts.headers || {};
				let bodyObj: any | undefined;

				if ((
					opts.method !== 'GET' && body && TypeChecker.isObject(body)
				) && (
					headers['Content-Type'] === 'application/json'
				)) {
					bodyObj = JSON.stringify(body);
					headers['Content-Length'] = bodyObj.length;
				} else {
					bodyObj = body;
				}

				opts.headers = headers;
				let protocol = httpsRequest;
				if (opts.protocol === 'http:') {
					protocol = httpRequest;
				}

				const req = protocol(opts, res => {

					res.setEncoding(responseEncoding || 'utf8');

					const dataResponse = new Transform();
					res.on('data', chunk => {
						dataResponse.push(chunk);
					});

					res.on('end', () => {
						try {
							let result: any;
							if (
								headers['Accept'] === 'application/json'
							) {
								result = JSON.parse(dataResponse.read());
							} else {
								result = dataResponse.read();
							}

							if (res.statusCode !== 200) {
								reject(new Error(`Invalid response code: ${res.statusCode}, with response: ${JSON.stringify(result)}`));
							} else {
								resolve(result);
							}
						} catch (error) {
							reject(error);
						}
					});

					res.on('error', error => {
						reject(error);
					});

				});

				req.on('error', error => {
					reject(error);
				});

				if (bodyObj) {
					if (TypeChecker.isString(bodyObj) || TypeChecker.isBuffer(bodyObj)) {
						req.write(bodyObj);
					} else {
						req.write(`${bodyObj}`);
					}
				}

				req.end();

			} catch (error) {
				reject(error);
			}

		});
	}

}
