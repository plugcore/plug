import * as FormData from 'form-data';
import { request as httpRequest, RequestOptions as HttpRequestOptions } from 'http';
import { request as httpsRequest, RequestOptions as HttpsRequestOptions } from 'https';
import { Transform, Writable } from 'stream';
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
		return this.makeCall({
			opts, body,
			responseEncoding: options ? options.responseEncoding : undefined,
			responseStream: options ? options.responseStream : undefined
		});
	}

	public static async httpsCall<T>(url: URL | string, options?: HttpsCallOptions, body?: any): Promise<T> {
		const opts = this.createOptions(url, options, body);
		opts.protocol = 'https:';
		return this.makeCall({
			opts, body,
			responseEncoding: options ? options.responseEncoding : undefined,
			responseStream: options ? options.responseStream : undefined
		});
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

	private static makeCall<T>(inp: {
		opts: HttpRequestOptions | HttpsRequestOptions;
		body?: any;
		responseEncoding?: BufferEncoding;
		responseStream?: Writable;
	}): Promise<T> {

		return new Promise<T>((resolve, reject) => {
			try {

				let headers = inp.opts.headers || {};
				let bodyObj: any | undefined;
				let multipartForm: FormData | undefined;
				if ((
					inp.opts.method !== 'GET' && inp.body && TypeChecker.isObject(inp.body)
				) && (
					headers['Content-Type'] === 'application/json'
				)) {
					bodyObj = JSON.stringify(inp.body);
					headers['Content-Length'] = bodyObj.length;
				} else {
					bodyObj = inp.body;
				}

				if (headers['Content-Type'] === 'multipart/form-data') {
					multipartForm = new FormData();
					for (const key of Object.keys(bodyObj || {})) {
						multipartForm.append(key, bodyObj[key]);
					}
					multipartForm.on('error', error => {
						if (inp.responseStream) {
							inp.responseStream.destroy();
						}
						reject(error);
					});
					headers = Object.assign(
						headers,
						multipartForm.getHeaders()
					);
				}

				inp.opts.headers = headers;
				let protocol = httpsRequest;
				if (inp.opts.protocol === 'http:') {
					protocol = httpRequest;
				}

				const req = protocol(inp.opts, res => {

					if (inp.responseStream) {
						res.pipe(inp.responseStream);
						res.on('end', () => {
							resolve(null as any); // The response is in the responseStream, this is just to end the stream
						});
					} else {
						res.setEncoding(inp.responseEncoding || 'utf8');
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
									const rawResult = dataResponse.read().toString();
									try {
										result = JSON.parse(rawResult);
									} catch (error) {
										reject({
											content: rawResult,
											error: error
										});
									}
								} else {
									result = dataResponse.read();
								}

								if (`${res.statusCode}`[0] !== '2') {
									reject({
										statusCode: res.statusCode,
										result
									});
								} else {
									resolve(result);
								}
							} catch (error) {
								reject(error);
							}
						});
					}

					res.on('error', error => {
						if (inp.responseStream) {
							inp.responseStream.destroy();
						}
						reject(error);
					});

				});

				req.on('error', error => {
					reject(error);
				});

				if (multipartForm) {
					multipartForm.pipe(req);
				} else if (bodyObj) {
					if (TypeChecker.isString(bodyObj) || TypeChecker.isBuffer(bodyObj)) {
						req.write(bodyObj);
					} else {
						req.write(`${bodyObj}`);
					}
					req.end();
				} else {
					req.end();
				}


			} catch (error) {
				reject(error);
			}

		});
	}

}
