/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { HttpClient } from '../../src/io/http.client';
import { HttpsClient } from '../../src/io/https.client';
import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';

interface IMockPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

@TestClass()
export class HttpClientTest extends PlugTest {

	private readonly getEx = '/posts';
	private readonly postEx = '/posts';
	private readonly putEx = '/posts/1';
	private readonly pathcEx = '/posts/1';
	private readonly deleteEx = '/posts/1';

	private readonly mokPost: IMockPost = {
		userId: 101,
		id: 101,
		title: 'titile',
		body: 'body'
	};
	private readonly mokPost2: IMockPost = {
		userId: 101,
		id: 1,
		title: 'titile',
		body: 'body'
	};

	@Test()
	public async httpTests() {

		const httpClient = new HttpClient('jsonplaceholder.typicode.com');

		const callsResp = await Promise.all([
			httpClient.get<IMockPost[]>(this.getEx),
			httpClient.post<IMockPost>(this.postEx, this.mokPost),
			httpClient.put<IMockPost>(this.putEx, this.mokPost),
			httpClient.patch<IMockPost>(this.pathcEx, this.mokPost),
			httpClient.delete<IMockPost>(this.deleteEx, this.mokPost)
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));

		const resPost = callsResp[1];
		this.assert.deepEqual(resPost, this.mokPost);

		const resPut = callsResp[2];
		this.assert.deepEqual(resPut, this.mokPost2);

		const resPatch = callsResp[3];
		this.assert.deepEqual(resPatch, this.mokPost);

		const resDelete = callsResp[4];
		this.assert.ok(resDelete);

	}

	@Test()
	public async httpsTests() {

		const httpsClient = new HttpsClient('jsonplaceholder.typicode.com');

		const callsResp = await Promise.all([
			httpsClient.get<IMockPost[]>(this.getEx),
			httpsClient.post<IMockPost>(this.postEx, this.mokPost),
			httpsClient.put<IMockPost>(this.putEx, this.mokPost),
			httpsClient.patch<IMockPost>(this.pathcEx, this.mokPost),
			httpsClient.delete<IMockPost>(this.deleteEx, this.mokPost)
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));

		const resPost = callsResp[1];
		this.assert.deepEqual(resPost, this.mokPost);

		const resPut = callsResp[2];
		this.assert.deepEqual(resPut, this.mokPost2);

		const resPatch = callsResp[3];
		this.assert.deepEqual(resPatch, this.mokPost);

		const resDelete = callsResp[4];
		this.assert.ok(resDelete);

	}

}
