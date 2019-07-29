import { BeforeTests, Container, HttpClient, PlugTest, Test, TestClass, AfterTests } from '@plugdata/core';
import { RoutesInitializer } from '../../src/routes/routes.initializer';
import { ControllerExample } from './examples/controller.example';
import { Controller2Example } from './examples/controller2.example';

@TestClass({ testThisOnly: true })
export class RoutesInitializerTest extends PlugTest {

	private httpClient: HttpClient;
	private readonly controller1Path = '/test';
	private readonly controller2Path = '/test2';
	private routesInitializer: RoutesInitializer;

	@BeforeTests()
	public async before() {
		this.routesInitializer = await Promise.all([
			Container.get(ControllerExample),
			Container.get(Controller2Example),
			Container.get<RoutesInitializer>(RoutesInitializer)
		]).then(r => r[2]);
		await this.routesInitializer.startHttpServer();
		this.httpClient = new HttpClient('localhost:3000');
	}

	@AfterTests()
	public async after() {
		this.routesInitializer.shutdownHttpServer();
	}

	@Test()
	public async getRegisteredMethods() {

		const rGet1 = await this.httpClient.get<any>(this.controller1Path);
		const rPost1 = await this.httpClient.post<any>(this.controller1Path);
		const rPut1 = await this.httpClient.put<any>(this.controller1Path);
		const rPatch1 = await this.httpClient.patch<any>(this.controller1Path);
		const rDelete1 = await this.httpClient.delete<any>(this.controller1Path);
		const rGet2 = await this.httpClient.get<any>(this.controller2Path);
		const rPost2 = await this.httpClient.post<any>(this.controller2Path);
		const rPut2 = await this.httpClient.put<any>(this.controller2Path);
		const rPatch2 = await this.httpClient.patch<any>(this.controller2Path);
		const rDelete2 = await this.httpClient.delete<any>(this.controller2Path);

		this.assert.ok(rGet1.method === 'getTest' && rGet1.test === 1);
		this.assert.ok(rPost1.method === 'postTest' && rPost1.test === 1);
		this.assert.ok(rPut1.method === 'putTest' && rPut1.test === 1);
		this.assert.ok(rPatch1.method === 'patchTest' && rPatch1.test === 1);
		this.assert.ok(rDelete1.method === 'deleteTest' && rDelete1.test === 1);
		this.assert.ok(rGet2.method === 'getTest' && rGet2.test === 2);
		this.assert.ok(rPost2.method === 'postTest' && rPost2.test === 2);
		this.assert.ok(rPut2.method === 'putTest' && rPut2.test === 2);
		this.assert.ok(rPatch2.method === 'patchTest' && rPatch2.test === 2);
		this.assert.ok(rDelete2.method === 'deleteTest' && rDelete2.test === 2);

	}

}
