import { AfterTests, BeforeTests, Container, HttpDatasource, Logger, PlugTest, Test, TestClass, TestUtils } from '@plugdata/core';
import { decode } from 'jwt-simple';
import { RoutesInitializer } from '../../src/routes/routes.initializer';
import { RoutesService } from '../../src/routes/routes.service';

interface IServicesResponse {
	method: string;
	jwtPayload?: any;
}

// We have to test 3 kind of servers
// 1: Server with no auth whatsoever
// 2: Server with JWT and Basic auth working at the same time, but sometimes just one type. All the routes are specified manually
// 3: Server with only JWT login bue at all routes

@TestClass()
export class RoutesAuthTest extends PlugTest {

	private pathWithSecurity = '/secured-path';
	private pathWithSecurity2 = '/secured-path2';
	private pathWithNoSecurity = '/secured-path/no-security';
	private pathWithNoSecurity2 = '/secured-path2/no-security';
	private customPrvateKey = 'plugtestprivatekey';
	private defaultPrvateKey = '8981F9391AF549443CC7D5141B24D';
	private basicAuthToken = 'dGVzdFVzZXI6dGVzdFBhc3N3b3Jk'; // testUser:testPassword
	private incorrectBasicAuthToken = 'dGVzdFVzZXI6dGVzdFBhc3N3b3JkMjM0'; // testUser:testPassword234
	private resultPayload = { prop1: 'string1', prop2: 2 };

	private httpClient1: HttpDatasource;
	private httpClient2: HttpDatasource;
	private httpClient3: HttpDatasource;
	private routesService1: RoutesService;
	private routesService2: RoutesService;
	private routesService3: RoutesService;

	@BeforeTests()
	public async beforeTests() {


		const log = await Container.get(Logger, { name: 'httpcontroller' });
		const cfgServer1 = TestUtils.createConfiguration({
			web: {
				server: { port: 3001 },
				oas: { enableDocumentation: false }
			}
		});
		const cfgServer2 = TestUtils.createConfiguration({
			web: {
				server: { port: 3002 },
				auth: {
					eanbled: true,
					securityInOas: ['jwt', 'basic']
				}
			}
		});
		const cfgServer3 = TestUtils.createConfiguration({
			web: {
				server: { port: 3003 },
				auth: {
					eanbled: true,
					jwtLoginPath: '/auth/jwt',
					jwtAlgorithm: 'HS512',
					jwtPrivateKey: this.customPrvateKey,
					securityInAllRoutes: ['jwt', 'basic']
				},
				oas: { enableDocumentation: false }
			}
		});
		this.routesService1 = new RoutesService(log, cfgServer1);
		this.routesService2 = new RoutesService(log, cfgServer2);
		this.routesService3 = new RoutesService(log, cfgServer3);
		const routesInitializer1 = new RoutesInitializer(log, this.routesService1, cfgServer1);
		const routesInitializer2 = new RoutesInitializer(log, this.routesService2, cfgServer2);
		const routesInitializer3 = new RoutesInitializer(log, this.routesService3, cfgServer3);

		await routesInitializer1.initHttpServer();
		await routesInitializer3.initHttpServer();
		await routesInitializer2.initHttpServer();

		this.httpClient1 = await Container.get(HttpDatasource, { [Container.connection]: 'local1' });
		this.httpClient2 = await Container.get(HttpDatasource, { [Container.connection]: 'local2' });
		this.httpClient3 = await Container.get(HttpDatasource, { [Container.connection]: 'local3' });

	}

	@AfterTests()
	public async after() {
		/* this.routesService1.shutdownHttpServer();
		this.routesService2.shutdownHttpServer();
		this.routesService3.shutdownHttpServer(); */
	}

	@Test()
	public async securityDisabled() {

		const resps = await Promise.all([
			this.httpClient1.get<IServicesResponse>(this.pathWithSecurity),
			this.httpClient1.post<IServicesResponse>(this.pathWithSecurity),
			this.httpClient1.patch<IServicesResponse>(this.pathWithSecurity),
			this.httpClient1.put<IServicesResponse>(this.pathWithSecurity),
			this.httpClient1.delete<IServicesResponse>(this.pathWithSecurity),
			this.httpClient1.get<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient1.post<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient1.patch<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient1.put<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient1.delete<IServicesResponse>(this.pathWithNoSecurity)
		]);

		this.assert.equal(resps[0].method, 'getTest');
		this.assert.equal(resps[1].method, 'postTest');
		this.assert.equal(resps[2].method, 'patchTest');
		this.assert.equal(resps[3].method, 'putTest');
		this.assert.equal(resps[4].method, 'deleteTest');

		this.assert.equal(resps[5].method, 'getTest2');
		this.assert.equal(resps[6].method, 'postTest2');
		this.assert.equal(resps[7].method, 'patchTest2');
		this.assert.equal(resps[8].method, 'putTest2');
		this.assert.equal(resps[9].method, 'deleteTest2');

		this.assert.equal(resps[0].jwtPayload, undefined);
		this.assert.equal(resps[1].jwtPayload, undefined);
		this.assert.equal(resps[2].jwtPayload, undefined);
		this.assert.equal(resps[3].jwtPayload, undefined);
		this.assert.equal(resps[4].jwtPayload, undefined);

		this.assert.equal(resps[5].jwtPayload, undefined);
		this.assert.equal(resps[6].jwtPayload, undefined);
		this.assert.equal(resps[7].jwtPayload, undefined);
		this.assert.equal(resps[8].jwtPayload, undefined);
		this.assert.equal(resps[9].jwtPayload, undefined);

	}

	@Test()
	public async securityAndNoSecurity() {

		const jwtToken = await this.httpClient2.post<{ token: string }>('/auth/login', { user: 'testUser' });

		this.assert.ok(decode(jwtToken.token, this.defaultPrvateKey, undefined, 'HS256'));

		const resps = await Promise.all([
			this.httpClient2.get<IServicesResponse>(this.pathWithSecurity, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient2.get<IServicesResponse>(this.pathWithSecurity, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient2.post<IServicesResponse>(this.pathWithSecurity, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient2.post<IServicesResponse>(this.pathWithSecurity, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient2.patch<IServicesResponse>(this.pathWithSecurity, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient2.put<IServicesResponse>(this.pathWithSecurity, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient2.delete<IServicesResponse>(this.pathWithSecurity, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
		]);

		const respsWithNoSecurity = await Promise.all([
			this.httpClient2.get<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient2.post<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient2.patch<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient2.put<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient2.delete<IServicesResponse>(this.pathWithNoSecurity),
			this.httpClient2.get<IServicesResponse>(this.pathWithNoSecurity, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient2.get<IServicesResponse>(this.pathWithNoSecurity, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
		]);

		await this.assert.rejects(this.httpClient2.get<IServicesResponse>(this.pathWithSecurity));
		await this.assert.rejects(this.httpClient2.post<IServicesResponse>(this.pathWithSecurity));
		await this.assert.rejects(this.httpClient2.patch<IServicesResponse>(this.pathWithSecurity));
		await this.assert.rejects(this.httpClient2.put<IServicesResponse>(this.pathWithSecurity));
		await this.assert.rejects(this.httpClient2.delete<IServicesResponse>(this.pathWithSecurity));
		await this.assert.rejects(this.httpClient2.put<IServicesResponse>(
			this.pathWithSecurity, { headers: { Authorization: `Bearer ${jwtToken.token}` } }
		));
		await this.assert.rejects(this.httpClient2.delete<IServicesResponse>(
			this.pathWithSecurity, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }
		));
		await this.assert.rejects(this.httpClient2.patch<IServicesResponse>(
			this.pathWithSecurity, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }
		));
		await this.assert.rejects(this.httpClient2.get<IServicesResponse>(
			this.pathWithSecurity, { headers: { Authorization: `Basic ${this.incorrectBasicAuthToken}` } }
		));
		await this.assert.rejects(this.httpClient2.get<IServicesResponse>(
			this.pathWithSecurity, { headers: { Authorization: `Bearer ${jwtToken.token}234` } }
		));

		this.assert.equal(resps[0].method, 'getTest');
		this.assert.equal(resps[1].method, 'getTest');
		this.assert.equal(resps[2].method, 'postTest');
		this.assert.equal(resps[3].method, 'postTest');
		this.assert.equal(resps[4].method, 'patchTest');
		this.assert.equal(resps[5].method, 'putTest');
		this.assert.equal(resps[6].method, 'deleteTest');

		this.assert.deepEqual(resps[0].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[1].jwtPayload, undefined);
		this.assert.deepEqual(resps[2].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[3].jwtPayload, undefined);
		this.assert.deepEqual(resps[4].jwtPayload, this.resultPayload);
		this.assert.equal(resps[5].jwtPayload, undefined);
		this.assert.deepEqual(resps[6].jwtPayload, this.resultPayload);

		this.assert.equal(respsWithNoSecurity[0].method, 'getTest2');
		this.assert.equal(respsWithNoSecurity[1].method, 'postTest2');
		this.assert.equal(respsWithNoSecurity[2].method, 'patchTest2');
		this.assert.equal(respsWithNoSecurity[3].method, 'putTest2');
		this.assert.equal(respsWithNoSecurity[4].method, 'deleteTest2');
		this.assert.equal(respsWithNoSecurity[5].method, 'getTest2');
		this.assert.equal(respsWithNoSecurity[6].method, 'getTest2');
		this.assert.equal(respsWithNoSecurity[0].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[1].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[2].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[3].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[4].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[5].jwtPayload, undefined);
		this.assert.equal(respsWithNoSecurity[6].jwtPayload, undefined);

	}

	@Test()
	public async securityInAllMethods() {

		const jwtToken = await this.httpClient3.post<{ token: string }>('/auth/jwt', { user: 'testUser' });

		this.assert.ok(decode(jwtToken.token, this.customPrvateKey, undefined, 'HS512'));

		const resps = await Promise.all([
			this.httpClient3.get<IServicesResponse>(this.pathWithSecurity2, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.get<IServicesResponse>(this.pathWithSecurity2, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.post<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.post<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.patch<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.patch<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.put<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.put<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.delete<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.delete<IServicesResponse>(this.pathWithSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } })
		]);

		const respsWithNoSecurity = await Promise.all([
			this.httpClient3.get<IServicesResponse>(this.pathWithNoSecurity2, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.get<IServicesResponse>(this.pathWithNoSecurity2, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.post<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.post<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.patch<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.patch<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.put<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.put<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } }),
			this.httpClient3.delete<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Bearer ${jwtToken.token}` } }),
			this.httpClient3.delete<IServicesResponse>(this.pathWithNoSecurity2, undefined, { headers: { Authorization: `Basic ${this.basicAuthToken}` } })
		]);

		await this.assert.rejects(this.httpClient3.get<IServicesResponse>(this.pathWithSecurity2));
		await this.assert.rejects(this.httpClient3.post<IServicesResponse>(this.pathWithSecurity2));
		await this.assert.rejects(this.httpClient3.patch<IServicesResponse>(this.pathWithSecurity2));
		await this.assert.rejects(this.httpClient3.put<IServicesResponse>(this.pathWithSecurity2));
		await this.assert.rejects(this.httpClient3.delete<IServicesResponse>(this.pathWithSecurity2));
		await this.assert.rejects(this.httpClient3.get<IServicesResponse>(this.pathWithNoSecurity2));
		await this.assert.rejects(this.httpClient3.post<IServicesResponse>(this.pathWithNoSecurity2));
		await this.assert.rejects(this.httpClient3.patch<IServicesResponse>(this.pathWithNoSecurity2));
		await this.assert.rejects(this.httpClient3.put<IServicesResponse>(this.pathWithNoSecurity2));
		await this.assert.rejects(this.httpClient3.delete<IServicesResponse>(this.pathWithNoSecurity2));

		this.assert.equal(resps[0].method, 'getTest');
		this.assert.equal(resps[1].method, 'getTest');
		this.assert.equal(resps[2].method, 'postTest');
		this.assert.equal(resps[3].method, 'postTest');
		this.assert.equal(resps[4].method, 'patchTest');
		this.assert.equal(resps[5].method, 'patchTest');
		this.assert.equal(resps[6].method, 'putTest');
		this.assert.equal(resps[7].method, 'putTest');
		this.assert.equal(resps[8].method, 'deleteTest');
		this.assert.equal(resps[9].method, 'deleteTest');

		this.assert.deepEqual(resps[0].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[1].jwtPayload, undefined);
		this.assert.deepEqual(resps[2].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[3].jwtPayload, undefined);
		this.assert.deepEqual(resps[4].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[5].jwtPayload, undefined);
		this.assert.deepEqual(resps[6].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[7].jwtPayload, undefined);
		this.assert.deepEqual(resps[8].jwtPayload, this.resultPayload);
		this.assert.deepEqual(resps[9].jwtPayload, undefined);

		this.assert.equal(respsWithNoSecurity[0].method, 'getTest2');
		this.assert.equal(respsWithNoSecurity[1].method, 'getTest2');
		this.assert.equal(respsWithNoSecurity[2].method, 'postTest2');
		this.assert.equal(respsWithNoSecurity[3].method, 'postTest2');
		this.assert.equal(respsWithNoSecurity[4].method, 'patchTest2');
		this.assert.equal(respsWithNoSecurity[5].method, 'patchTest2');
		this.assert.equal(respsWithNoSecurity[6].method, 'putTest2');
		this.assert.equal(respsWithNoSecurity[7].method, 'putTest2');
		this.assert.equal(respsWithNoSecurity[8].method, 'deleteTest2');
		this.assert.equal(respsWithNoSecurity[9].method, 'deleteTest2');

		this.assert.deepEqual(respsWithNoSecurity[0].jwtPayload, this.resultPayload);
		this.assert.deepEqual(respsWithNoSecurity[1].jwtPayload, undefined);
		this.assert.deepEqual(respsWithNoSecurity[2].jwtPayload, this.resultPayload);
		this.assert.deepEqual(respsWithNoSecurity[3].jwtPayload, undefined);
		this.assert.deepEqual(respsWithNoSecurity[4].jwtPayload, this.resultPayload);
		this.assert.deepEqual(respsWithNoSecurity[5].jwtPayload, undefined);
		this.assert.deepEqual(respsWithNoSecurity[6].jwtPayload, this.resultPayload);
		this.assert.deepEqual(respsWithNoSecurity[7].jwtPayload, undefined);
		this.assert.deepEqual(respsWithNoSecurity[8].jwtPayload, this.resultPayload);
		this.assert.deepEqual(respsWithNoSecurity[9].jwtPayload, undefined);

	}

}
