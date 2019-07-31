import { request as httpRequest, RequestOptions as HttpRequestOptions } from 'http';
import { request as httpsRequest, RequestOptions as HttpsRequestOptions } from 'https';
import { URL, URLSearchParams } from 'url';
import { TypeChecker } from '../utils/type.checker';
import { HttpCallOptions, HttpsCallOptions } from './http.shared';

export class HttpUtils {

	//
	// Public methods
	//

	public static async httpCall<T>(url: URL | string, options?: HttpCallOptions, body?: any): Promise<T> {
		const opts = this.createOptions(url, options);
		opts.protocol = 'http:';
		return this.makeCall(opts, body);
	}

	public static async httpsCall<T>(url: URL | string, options?: HttpsCallOptions, body?: any): Promise<T> {
		const opts = this.createOptions(url, options);
		opts.protocol = 'https:';
		return this.makeCall(opts, body);
	}

	//
	// Private methods
	//

	private static createOptions<T extends HttpCallOptions | HttpsCallOptions>(
		url: URL | string, options?: T
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

		return opts;
	}

	private static makeCall<T>(opts: HttpRequestOptions | HttpsRequestOptions, body?: any): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			try {

				let bodyObj: string | undefined;
				if (opts.method !== 'GET' && body && Object.keys(body).length > 0) {
					bodyObj = JSON.stringify(body);
					const headers = opts.headers || {};
					headers['Content-Type'] = 'application/json';
					headers['Content-Length'] = bodyObj.length;
					opts.headers = headers;
				}
				let protocol = httpsRequest;
				if (opts.protocol === 'http:') {
					protocol = httpRequest;
				}

				const req = protocol(opts, res => {

					res.setEncoding('utf8');

					let dataResponse = '';
					res.on('data', chunk => {
						dataResponse += chunk;
					});

					res.on('end', () => {
						try {
							resolve(JSON.parse(dataResponse));
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
					req.write(bodyObj);
				}

				req.end();

			} catch (error) {
				reject(error);
			}

		});
	}

}
