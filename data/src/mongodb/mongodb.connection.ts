import { Inject, ProjectConfiguration, Service, IDiOnInit, ClassParameter, TypeChecker } from '@plugdata/core';
import { TDataConfugration } from '../configuration/configuration.insterfaces';
import { MongoClient, Db, Collection } from 'mongodb';

@Service()
export class MongoDbConnection implements IDiOnInit {

	private dbConnection: Db;
	private mongoClient: MongoClient;

	constructor(
		@Inject({ sId: ProjectConfiguration }) private configuration: TDataConfugration
	) { }

	public async onInit() {
		if (this.configuration.data) {
			this.mongoClient = await MongoClient.connect(
				this.configuration.data.url, Object.assign({
					useNewUrlParser: true
				}, this.configuration.data.options));
			this.dbConnection = this.mongoClient.db(this.configuration.data.databaseName);
		}
	}

	/**
	 * Creates a Mongodb client connected to the default mongodb connection
	 * and already attached to a determined collection
	 * @param collection 
	 */
	public async getCollection<T>(collection: ClassParameter<T> | string): Promise<Collection<T>> {

		const collectionName = TypeChecker.isString(collection) ? collection : collection.name;
		const collectionFromConnection: Collection<T> = await (new Promise((resolve, reject) => {
			this.dbConnection.collection(collectionName, (error, mdbCollection) => {
				if (error) {
					reject(error);
				} else {
					resolve(mdbCollection);
				}
			});
		}));

		return collectionFromConnection;

	}

	public async closeConnection(force?: boolean) {
		return this.mongoClient.close(force);
	}

}
