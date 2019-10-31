/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { AfterTests, BeforeTests, Container, HttpClient, PlugTest, Test, TestClass } from '@plugdata/core';
import { RoutesInitializer } from '../../src/routes/routes.initializer';
import { RoutesService } from '../../src/routes/routes.service';
import { ControllerExample } from './examples/controller.example';
import { Controller2Example } from './examples/controller2.example';
import { ExampleRequest } from './examples/route-validators.example';

@TestClass()
export class RoutesInitializerTest extends PlugTest {

	private httpClient: HttpClient;
	private readonly controller1Path = '/test';
	private readonly controller2Path = '/test2';
	private routesInitializer: RoutesInitializer;
	private routesService: RoutesService;
	private controllerExample: ControllerExample;

	@BeforeTests()
	public async before() {

		const deps = await Promise.all([
			Container.get<ControllerExample>(ControllerExample),
			Container.get(Controller2Example),
			Container.get<RoutesInitializer>(RoutesInitializer),
			Container.get<RoutesService>(RoutesService)
		]).then(r => ({ controllerExample: r[0], routesInitializer: r[2], routesService: r[3] }));
		this.routesInitializer = deps.routesInitializer;
		this.routesService = deps.routesService;
		this.controllerExample = deps.controllerExample;
		await this.routesInitializer.initHttpServer();
		this.httpClient = new HttpClient(this.routesService.addressListenning);
	}

	@AfterTests()
	public async after() {
		this.routesService.shutdownHttpServer();
	}

	@Test()
	public async getRegisteredMethods() {

		const rGet1 = await this.httpClient.get<any>(this.controller1Path);
		const rPost1 = await this.httpClient.post<any>(this.controller1Path, <ExampleRequest>{
			isPublic: true, name: 'test'
		}, {
			headers: { Authorization: 'Bearer 89abddfb-2cff-4fda-83e6-13221f0c3d4f' },
			params: { customId: '1', num: 2 }
		});
		const rPut1 = await this.httpClient.put<any>(this.controller1Path);
		const rPatch1 = await this.httpClient.patch<any>(this.controller1Path);
		const rDelete1 = await this.httpClient.delete<any>(this.controller1Path);
		const rGet2 = await this.httpClient.get<any>(this.controller2Path);
		const rPost2 = await this.httpClient.post<any>(this.controller2Path);
		const rPut2 = await this.httpClient.put<any>(this.controller2Path);
		const rPatch2 = await this.httpClient.patch<any>(this.controller2Path);
		const rDelete2 = await this.httpClient.delete<any>(this.controller2Path);

		this.assert.ok(rGet1.method === 'getTest' && rGet1.test === 1);
		this.assert.ok(rPost1.success);
		this.assert.ok(rPut1.method === 'putTest' && rPut1.test === 1);
		this.assert.ok(rPatch1.method === 'patchTest' && rPatch1.test === 1);
		this.assert.ok(rDelete1.method === 'deleteTest' && rDelete1.test === 1);
		this.assert.ok(rGet2.method === 'getTest' && rGet2.test === 2);
		this.assert.ok(rPost2.method === 'postTest' && rPost2.test === 2);
		this.assert.ok(rPut2.method === 'putTest' && rPut2.test === 2);
		this.assert.ok(rPatch2.method === 'patchTest' && rPatch2.test === 2);
		this.assert.ok(rDelete2.method === 'deleteTest' && rDelete2.test === 2);
		this.assert.ok(this.controllerExample.preHandlerCalled);
		this.assert.ok(this.controllerExample.preParsingCalled);
		this.assert.ok(this.controllerExample.preSerializationCalled);
		this.assert.ok(this.controllerExample.preValidationCalled);
		this.assert.ok(this.controllerExample.onRequestCalled);
		this.assert.ok(this.controllerExample.loggerNotNull);

	}

}
