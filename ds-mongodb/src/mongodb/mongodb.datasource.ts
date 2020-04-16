import {
	ClassParameter, Configuration, DataSource, InjectConfiguration,
	Logger, OnInit, TypeChecker, ValidatorUtils, InjectConnection
} from '@plugcore/core';
import { Collection, Db, MongoClient } from 'mongodb';
import { IGetCollectionOptions } from './mongodb.interfaces';
import { MongodbDsConfiguration } from './mongodb.configuration';

@DataSource({ type: 'mongodb' })
export class MongoDbDatasource implements OnInit {

	private inMemoryDb = 'nedb';
	private mongodbConfiguration: MongodbDsConfiguration;
	private dbConnection: Db;
	private mongoClient: MongoClient;

	constructor(
		private log: Logger,
		@InjectConfiguration() private configuration: Configuration,
		@InjectConnection() private connection?: string
	) {
		if (this.connection) {
			this.mongodbConfiguration = this.configuration.getConnectionConfiguration(
				MongodbDsConfiguration, this.connection);
		}
	}

	public async onInit() {
		if (this.mongodbConfiguration && this.mongodbConfiguration.url !== this.inMemoryDb) {
			try {
				this.mongoClient = await MongoClient.connect(this.mongodbConfiguration.url, Object.assign({
					useNewUrlParser: true
				}, this.mongodbConfiguration.options));
				this.dbConnection = this.mongoClient.db(this.mongodbConfiguration.databaseName);
			} catch (error) {
				this.log.error('Error while connecting to MongoDB', error);
			}
		}
	}

	/**
	 * Creates a Mongodb client connected to the default mongodb connection
	 * and already attached to a determined collection
	 * @param collection
	 */
	public async getCollection<T>(
		collection: ClassParameter<T> | string, options?: IGetCollectionOptions<T>
	): Promise<Collection<T>> {

		if (!this.mongodbConfiguration) {
			this.log.error('No database configuration has been found');
		}
		if (this.mongodbConfiguration.url === this.inMemoryDb) {
			const inMemoryDbClass = require(this.inMemoryDb);
			return new Proxy(new inMemoryDbClass(), new NedbProxy());
		}

		const collectionName = TypeChecker.isString(collection) ? collection : collection.name;

		const collectionFromConnection: Collection<T> = await (new Promise((resolve, reject) => {
			if (!this.dbConnection.collection) {
				reject('No database connection has been found, check database configuration for more info');
			}
			this.dbConnection.collection(collectionName, (error, mdbCollection) => {
				if (error) {
					reject(error);
				} else {
					if (options && (options.createIfDoesntExists || options.createIfDoesntExists !== undefined)) {
						// Create collection if doesn't exists
						// TODO: Improve readibility
						const r = this.dbConnection.listCollections({ name: collectionName }, { nameOnly: true });
						r.hasNext((error, hasNext) => {
							if (error) {
								reject(error);
							} else {
								if (hasNext) {
									resolve(mdbCollection);
								} else {
									this.dbConnection.createCollection(collectionName, (error, newCollection) => {
										if (error) {
											reject(error);
										} else {
											resolve(newCollection);
										}
									});
								}
							}
						});
					} else {
						// Just retunr the collection connection otherwise
						resolve(mdbCollection);
					}

				}
			});
		}));

		if (options && options.ensureIndexes) {
			const indexes: { key: Record<string, number> }[] = await collectionFromConnection.indexes();
			await Promise.all(options.ensureIndexes.map(async indexOpts => {
				// This check is unnecessary since mongodb doesn't create the same index twice
				// but it's included just to speed up collection connection
				const prevIndex = indexes.find(indx => ValidatorUtils.deepEqual(indx.key, indexOpts.key));
				if (!prevIndex) {
					await collectionFromConnection.createIndex(indexOpts.key, indexOpts.options);
				}
			}));
		}

		return collectionFromConnection;

	}

	public async isConnected() {
		return this.dbConnection !== undefined && this.dbConnection !== null;
	}

	public async closeConnection(force?: boolean) {
		if (this.mongodbConfiguration && this.mongodbConfiguration.url !== this.inMemoryDb) {
			return this.mongoClient.close(force);
		}
	}

	public getMongoClient() {
		return this.mongoClient;
	}

	public getConnection() {
		return this.dbConnection;
	}

}

//
// Nedb Implementation
//

const nedbMethodTranslator: Record<string, string> = {
	'insertOne': 'insert',
	'deleteOne': 'remove',
	'toArray': 'exec'
};
const nedbMethodsDontNeedPromisify: string[] = [
	'find', 'skip', 'limit', 'sort'
];


/**
 * Promisifies all the methods
 */
class NedbProxy implements ProxyHandler<any> {
	get(target: any, p: PropertyKey) {

		const propKey = nedbMethodTranslator[p.toString()] ?
			nedbMethodTranslator[p.toString()] : p;

		const origMethod = target[propKey];

		if (propKey === 'then') {
			return false;
		}

		return (...args: any[]) => {
			if (nedbMethodsDontNeedPromisify.includes(propKey.toString())) {
				const result = origMethod.apply(target, args);
				return new Proxy(result, new NedbProxy());
			}
			return new Promise((resolve, reject) => {
				const newArgs = args || [];
				newArgs.push((err?: Error, result?: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
				origMethod.apply(target, newArgs);
			});
		};
	}
}
