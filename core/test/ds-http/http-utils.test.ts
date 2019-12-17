import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { HttpUtils } from '../../src/ds-http/http.utils';

@TestClass()
export class HttpUtilsTest extends PlugTest {

	private readonly getEx = 'jsonplaceholder.typicode.com/posts';
	private readonly postEx = 'jsonplaceholder.typicode.com/posts';
	private readonly putEx = 'jsonplaceholder.typicode.com/posts/1';
	private readonly pathcEx = 'jsonplaceholder.typicode.com/posts/1';
	private readonly deleteEx = 'jsonplaceholder.typicode.com/posts/1';

	@Test()
	public async httpTests() {
		const prefix = 'http://';

		const callsResp: any[] = await Promise.all([ // Typescript 1.7 bug with array types
			HttpUtils.httpCall(prefix + this.getEx),
			HttpUtils.httpCall(new URL(prefix + this.getEx), { params: { userId: 1 } }),
			HttpUtils.httpCall<{ test: number }>(prefix + this.postEx, { method: 'POST' }, { test: 1 }),
			HttpUtils.httpCall<{ test: number }>(prefix + this.putEx, { method: 'PUT' }, { test: 1 }),
			HttpUtils.httpCall<{ test: number }>(prefix + this.pathcEx, { method: 'PATCH' }, { test: 1 }),
			HttpUtils.httpCall<{ test: number }>(prefix + this.deleteEx, { method: 'DELETE' }, { test: 1 })
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));

		const resGet2 = callsResp[1];
		this.assert.ok(Array.isArray(resGet2));

		const resPost = callsResp[2];
		this.assert.ok(resPost.test = 1);

		const resPut = callsResp[3];
		this.assert.ok(resPut.test = 1);

		const resPatch = callsResp[4];
		this.assert.ok(resPatch.test = 1);

		const resDelete = callsResp[5];
		this.assert.ok(resDelete.test = 1);
	}

	@Test()
	public async httpsTests() {
		const prefix = 'https://';

		const callsResp: any[] = await Promise.all([ // Typescript 1.7 bug with array types
			HttpUtils.httpsCall(prefix + this.getEx),
			HttpUtils.httpsCall(new URL(prefix + this.getEx), { params: { userId: 1 } }),
			HttpUtils.httpsCall<{ test: number }>(prefix + this.postEx, { method: 'POST' }, { test: 1 }),
			HttpUtils.httpsCall<{ test: number }>(prefix + this.putEx, { method: 'PUT' }, { test: 1 }),
			HttpUtils.httpsCall<{ test: number }>(prefix + this.pathcEx, { method: 'PATCH' }, { test: 1 }),
			HttpUtils.httpsCall<{ test: number }>(prefix + this.deleteEx, { method: 'DELETE' }, { test: 1 })
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));

		const resGet2 = callsResp[1];
		this.assert.ok(Array.isArray(resGet2));

		const resPost = callsResp[2];
		this.assert.ok(resPost.test = 1);

		const resPut = callsResp[3];
		this.assert.ok(resPut.test = 1);

		const resPatch = callsResp[4];
		this.assert.ok(resPatch.test = 1);

		const resDelete = callsResp[5];
		this.assert.ok(resDelete.test = 1);

	}

}
