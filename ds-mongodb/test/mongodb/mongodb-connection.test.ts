import { AfterTests, AsserterService, BeforeTests, Test, TestService } from '@plugcore/core';
import { Collection } from '../../src/mongodb/mongodb.interfaces';
import { DbCollectionExample } from './examples/dbcollection.example';
import { MongoDbDatasource } from '../../src/mongodb/mongodb.datasource';

@TestService({ connection: 'testdb' })
export class MongoDbConnectionTest extends AsserterService {

	private collection: Collection<DbCollectionExample>;

	constructor(
		private mongoDbConnection: MongoDbDatasource
	) {
		super();
	}

	@BeforeTests()
	public async before() {
		this.collection = await this.mongoDbConnection.getCollection(DbCollectionExample);
	}

	@AfterTests()
	public async after() {
		this.mongoDbConnection.closeConnection();
	}

	@Test()
	public async connectionTest() {

		const testData: DbCollectionExample = {
			testS: '1',
			testN: 2
		};
		await this.collection.insert(testData);
		const findOneResult = await this.collection.findOne(testData);
		this.assert.ok(findOneResult);
		await this.collection.remove(testData);
		const findOneResultAfterDelete = await this.collection.findOne(testData);
		this.assert.ok(!findOneResultAfterDelete);

	}

}
