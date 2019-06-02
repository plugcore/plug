import { request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { URL, URLSearchParams } from 'url';

export class HttpUtils {

	public static async call<T>(url: URL, params?: any, body?: object): Promise<T> {

		return new Promise<T>((resolve, reject) => {

			try {

				if (params && Object.keys(params).length > 0) {

					const queryParams: any = new URLSearchParams(params);
					url.search = queryParams;
				}

				let protocol = httpsRequest;

				if (url.protocol === 'http:') {
					protocol = httpRequest;
				}

				const req = protocol(
					url, (res: any) => {

						res.setEncoding('utf8');

						let dataResponse = '';
						res.on('data', (chunk: any) => {
							dataResponse += chunk;
						});

						res.on('end', () => {
							try {
								resolve(JSON.parse(dataResponse));
							} catch (error) {
								reject(error);
							}
						});

						res.on('error', (error: any) => {
							reject(error);
						});

					});
				req.on('error', error => {
					reject(error);
				});

				if (body && Object.keys(body).length > 0) {
					const bodyObj = JSON.stringify(body);
					req.write(bodyObj);
				}

				req.end();

			} catch (error) {
				reject(error);
			}
		});
	}
}
