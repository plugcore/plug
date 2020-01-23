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

	@Test({ testThisOnly: true })
	public async connectionTest() {

		const testData: DbCollectionExample = {
			testS: '1',
			testN: 2
		};
		const testData2: DbCollectionExample = {
			testS: '2',
			testN: 2
		};
		const testData3: DbCollectionExample = {
			testS: '3',
			testN: 2
		};
		await this.collection.insert(testData);
		await this.collection.insert(testData2);
		await this.collection.insert(testData3);

		const all = await this.collection.find({}).toArray();
		this.assert.ok(all);
		this.assert.ok(Array.isArray(all));
		this.assert.ok(all.length > 0);

		const sorted = await this.collection.find({}).sort({ testS: 1 }).skip(1).limit(2).toArray();
		this.assert.ok(sorted);
		this.assert.ok(Array.isArray(sorted));
		this.assert.ok(sorted.length == 2);

		const findOneResult = await this.collection.findOne(testData);
		this.assert.ok(findOneResult);

		await this.collection.remove(testData);
		const findOneResultAfterDelete = await this.collection.findOne(testData);
		this.assert.ok(!findOneResultAfterDelete);

	}

}
