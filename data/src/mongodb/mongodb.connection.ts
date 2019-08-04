import { ClassParameter, IDiOnInit, Inject, Logger, ObjectUtils, ProjectConfiguration, Service, TypeChecker } from '@plugdata/core';
import { Collection, Db, MongoClient } from 'mongodb';
import { TDataConfugration } from '../configuration/configuration.insterfaces';
import { IGetCollectionOptions } from './mongodb.interfaces';

@Service()
export class MongoDbConnection implements IDiOnInit {

	private dbConnection: Db;
	private mongoClient: MongoClient;

	constructor(
		private log: Logger,
		@Inject({ sId: ProjectConfiguration }) private configuration: TDataConfugration
	) { }

	public async onInit() {
		if (this.configuration.data) {
			try {
				this.mongoClient = await MongoClient.connect(
					this.configuration.data.url, Object.assign({
						useNewUrlParser: true
					}, this.configuration.data.options));
				this.dbConnection = this.mongoClient.db(this.configuration.data.databaseName);
			} catch (error) {
				this.log.error('Error while connecting to MongoDB', error);
			}
		} else {
			this.log.debug('No database configuration has been found');
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

		const collectionName = TypeChecker.isString(collection) ? collection : collection.name;
		const collectionFromConnection: Collection<T> = await (new Promise((resolve, reject) => {
			if (!this.dbConnection.collection) {
				reject('No database connection has been found, check database configuration for more info');
			}
			this.dbConnection.collection(collectionName, (error, mdbCollection) => {
				if (error) {
					reject(error);
				} else {
					if (options && (options.createIfDoesntExists || options.createIfDoesntExists !== undefined) ) {
						// Create collection if doesn't exists
						// TODO: Improve readibility
						const r = this.dbConnection.listCollections({ name: collectionName }, { nameOnly: true });
						r.hasNext((error, hasNext)=> {
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
				const prevIndex = indexes.find(indx => ObjectUtils.deepEqual(indx.key, indexOpts.key));
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
		return this.mongoClient.close(force);
	}

}
