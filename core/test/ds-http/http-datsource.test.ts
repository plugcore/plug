
import { Test, TestService, BeforeTests } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { HttpDatasource } from '../../src/ds-http/http.datasource';
import { Container } from '../../src/dependecy-injection/di.container';

interface IMockPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

interface IMockPostAction {
	id: number;
}

@TestService()
export class HttpDatasourceTest extends AsserterService {

	private readonly getEx = '/posts';
	private readonly postEx = '/posts';
	private readonly putEx = '/posts/1';
	private readonly pathcEx = '/posts/1';
	private readonly deleteEx = '/posts/1';

	private httpClient: HttpDatasource;
	private httpsClient: HttpDatasource;

	private readonly mokPost: IMockPost = {
		'userId': 1,
		'id': 1,
		'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
		'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
	};
	private readonly mokPost2: IMockPostAction = {
		'id': 1
	};
	private readonly mokPost3: IMockPostAction = {
		'id': 101
	};
	private readonly mokPost4: IMockPost = {
		'userId': 1,
		'id': 101,
		'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
		'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
	};

	@BeforeTests()
	public async beforeTests() {
		this.httpClient = await Container.get(HttpDatasource, { [Container.connection]: 'typicodeHttp' });
		this.httpsClient = await Container.get(HttpDatasource, { [Container.connection]: 'typicodeHttps' });
	}

	@Test()
	public async httpTests() {

		const callsResp = await Promise.all([
			this.httpClient.get<IMockPost[]>(this.getEx),
			this.httpClient.post<IMockPost>(this.postEx, this.mokPost, { headers: {} }),
			this.httpClient.put<IMockPost>(this.putEx, this.mokPost),
			this.httpClient.patch<IMockPost>(this.pathcEx, this.mokPost),
			this.httpClient.delete<IMockPost>(this.deleteEx, this.mokPost)
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));
		this.assert.ok(resGet.length === 100);

		const resPost = callsResp[1];
		this.assert.deepEqual(resPost, this.mokPost4);

		const resPut = callsResp[2];
		this.assert.deepEqual(resPut, this.mokPost);

		const resPatch = callsResp[3];
		this.assert.deepEqual(resPatch, this.mokPost);

		const resDelete = callsResp[4];
		this.assert.ok(resDelete);

	}

	@Test()
	public async httpsTests() {

		const callsResp = await Promise.all([
			this.httpsClient.get<IMockPost[]>(this.getEx),
			this.httpsClient.post<IMockPost>(this.postEx, this.mokPost),
			this.httpsClient.put<IMockPost>(this.putEx, this.mokPost),
			this.httpsClient.patch<IMockPost>(this.pathcEx, this.mokPost),
			this.httpsClient.delete<IMockPost>(this.deleteEx, this.mokPost)
		]);

		const resGet = callsResp[0];
		this.assert.ok(Array.isArray(resGet));

		const resPost = callsResp[1];
		this.assert.deepEqual(resPost, this.mokPost4);

		const resPut = callsResp[2];
		this.assert.deepEqual(resPut, this.mokPost);

		const resPatch = callsResp[3];
		this.assert.deepEqual(resPatch, this.mokPost);

		const resDelete = callsResp[4];
		this.assert.ok(resDelete);

	}

}
