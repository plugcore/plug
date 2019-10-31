/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { TestClass, PlugTest, BeforeTests, Container, ProjectConfiguration, Test, AfterTests } from '@plugdata/core';
import { Collection } from '../../src/mongodb/mongodb.interfaces';
import { DbCollectionExample } from './examples/dbcollection.example';
import { MongoDbConnection } from '../../src/mongodb/mongodb.connection';

@TestClass()
export class MongoDbConnectionTest extends PlugTest {

	private collection: Collection<DbCollectionExample>;
	private mongoDbConnection: MongoDbConnection;

	@BeforeTests()
	public async before() {
		const configuration = await Container.get<ProjectConfiguration>(ProjectConfiguration);
		if (configuration.data) {
			this.mongoDbConnection = await Container.get<MongoDbConnection>(MongoDbConnection);
			this.collection = await this.mongoDbConnection.getCollection(DbCollectionExample);
		}
	}

	@AfterTests()
	public async after() {
		this.mongoDbConnection.closeConnection();
	}

	@Test()
	public async connectionTest() {

		// If there is no collection it means there was no configuration
		// In order to properly test this you have to create the file:
		// data/test/configuration/configuration.test.json
		// With a valid mongodb configuration defined in IDataConfiguration
		if (this.collection) {
			const testData: DbCollectionExample = {
				testS: '1',
				testN: 2
			};
			await this.collection.insertOne(testData);
			const findOneResult = await this.collection.findOne(testData);
			this.assert.ok(findOneResult);
			await this.collection.deleteOne(testData);
			const findOneResultAfterDelete = await this.collection.findOne(testData);
			this.assert.ok(!findOneResultAfterDelete);
		} else {
			this.assert.ok(true);
		}

	}

}
