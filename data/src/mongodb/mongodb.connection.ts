/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ClassParameter, IDiOnInit, Logger, ObjectUtils, ProjectConfiguration, Service, TypeChecker } from '@plugdata/core';
import { Collection, Db, MongoClient } from 'mongodb';
import { IGetCollectionOptions } from './mongodb.interfaces';
import { PlugDataConfiguration } from '../configuration/configuration.interfaces';

@Service()
export class MongoDbConnection implements IDiOnInit {

	private dbConnection: Db;
	private mongoClient: Omit<MongoClient, ''>;

	private connectionName?: string;
	private dataConfiguration: PlugDataConfiguration;

	// private configuration: ProjectConfiguration;
	constructor(
		private log: Logger,
		private configuration: ProjectConfiguration
	) {
		this.dataConfiguration = configuration.getProp<PlugDataConfiguration>('data');
	}

	public async onInit() {

		if (this.dataConfiguration) {
			try {
				if (this.connectionName) {
					const connection = (this.dataConfiguration.connections || []).find(c => c.name === this.connectionName);
					if (connection) {
						this.mongoClient = await MongoClient.connect(connection.url, Object.assign({
							useNewUrlParser: true
						}, connection.options));
						this.dbConnection = this.mongoClient.db(connection.databaseName);
					} else {
						this.log.error('Mongodb connection not found in configuration: ' + this.connectionName);
					}
				} else {
					this.mongoClient = await MongoClient.connect(
						this.dataConfiguration.defaultConnection.url, Object.assign({
							useNewUrlParser: true
						}, this.dataConfiguration.defaultConnection.options));
					this.dbConnection = this.mongoClient.db(this.dataConfiguration.defaultConnection.databaseName);
				}
			} catch (error) {
				this.log.error('Error while connecting to MongoDB', error);
			}
		} else {
			this.log.error('No database configuration has been found');
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
