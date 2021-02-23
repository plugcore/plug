import { ObjectUtils, OnInit } from '@plugcore/core';
import { BulkWriteInsertOneOperation, CollectionAggregationOptions, CollectionBulkWriteOptions, CommonOptions, FilterQuery, FindOneOptions, MongoCountPreferences, UpdateOneOptions, UpdateQuery } from 'mongodb';
import { AuditedDocument, Collection, MongoDbRepositoryCfg, PaginationConf, PaginationResponse } from './mongodb.interfaces';

type WithoutProjection<T> = T & { fields?: undefined; projection?: undefined };


export class MongoDbRepository<Entity extends (Record<string, any> & AuditedDocument & { _id?: any }), EntityId extends keyof Entity> implements OnInit {

	//
	// Public attributes
	//

	private collection: Collection<Entity>;
	private collectionDeletedEntries: Collection<Entity>;

	//
	// Private attributes
	//

	private configuration: MongoDbRepositoryCfg<Entity, EntityId>;
	private deletedCollectionPrefix = 'deleted';
	private userNotProvided = null;

	/**
	 * In order to use this util class you have
	 * to provide a list of id fields, which will be
	 * used for update/query purposes
	 */
	constructor(configuration: MongoDbRepositoryCfg<Entity, EntityId>) {
		this.configuration = configuration;
	}

	//
	// DI Events
	//

	public async onInit() {
		// Entity collection
		this.collection = await this.configuration.dataSource.getCollection<Entity>(
			this.configuration.collectionName
		);
		if (
			this.configuration.indexes &&
			Array.isArray(this.configuration.indexes) &&
			this.configuration.indexes.length > 0
		) {
			await this.collection.createIndexes(this.configuration.indexes);
		}
		if (this.configuration.auditDeletedEntries) {
			// Deleted entitities collection
			this.collectionDeletedEntries = await this.configuration.dataSource.getCollection<Entity>(
				this.deletedCollectionPrefix + this.capitalize(this.configuration.collectionName)
			);
		}
	}

	public static async create<Entity, EntityId extends keyof Entity>(
		configuration: MongoDbRepositoryCfg<Entity, EntityId>
	) {
		const newInstance = new MongoDbRepository<Entity, EntityId>(configuration);
		await newInstance.onInit();
		return newInstance;
	}

	//
	// Public methods
	//

	public async exists(id: Entity[EntityId], options?: MongoCountPreferences) {
		const result = await this.collection.countDocuments(
			<any>{ [this.configuration.idAttribute]: id },
			Object.assign(options || {}, { limit: 1 })
		);
		return result > 0;
	}

	public async existsWithQuery(query: FilterQuery<Entity>, options?: MongoCountPreferences) {
		const result = await this.collection.countDocuments(
			query,
			Object.assign(options || {}, { limit: 1 })
		);
		return result > 0;
	}

	public async findAll(options?: WithoutProjection<FindOneOptions<Entity>>) {
		return this.collection.find({}, options).toArray();
	}

	public async findById(id: Entity[EntityId], options?: WithoutProjection<FindOneOptions<Entity>>) {
		return this.collection.findOne(<Entity>{ [this.configuration.idAttribute]: id }, options);
	}

	public async findByIds(ids: Entity[EntityId][], options?: WithoutProjection<FindOneOptions<Entity>>) {
		return this.collection.find(<Entity>{ [this.configuration.idAttribute]: { $in: ids } }, options).toArray();
	}

	public async paginate(
		conf: PaginationConf<Entity>, options?: CollectionAggregationOptions
	) {

		const aggr: any[] = conf.previousAggregationSteps || [];

		// Step 1: match
		const match: FilterQuery<Entity> = conf.customQuery || {};
		if (conf.fieldsAsLike) {
			for (const fieldKey of Object.keys(conf.fieldsAsLike)) {
				if (conf.fieldsAsLike[fieldKey] !== undefined) {
					(<any>match)[fieldKey] = new RegExp(`.*${conf.fieldsAsLike[fieldKey]}.*`, 'i');
				}
			}
		}
		if (conf.textSearch) {
			match.$text = {
				$search: typeof conf.textSearch === 'string' ?
					conf.textSearch : `${conf.textSearch}`
			};
		}

		if (Object.keys(match).length > 0) {
			aggr.push({ $match: match });
		}

		// Step 2: Sort
		if (conf.context && conf.context.sortField) {
			aggr.push({
				$sort: {
					[conf.context.sortField]: conf.context.sortDirection || -1
				}
			});
		} else if (conf.textSearch) {
			aggr.push({
				$sort: { score: { $meta: 'textScore' } }
			});
		} else if (conf.defaultSort) {
			aggr.push({
				$sort: {
					[conf.defaultSort.field]: conf.defaultSort.direction || -1
				}
			});
		}

		// Step 3: Facet
		const page = conf.context ? (conf.context.page || 0) : 0;
		const delta = conf.context ? (conf.context.delta || 10) : 10;
		const dontPaginate = conf.context && conf.context.page === -1 && conf.context.delta === -1;
		aggr.push({
			$facet: {
				metadata: [{ $count: 'total' }],
				data: dontPaginate ? [{ $match: {} }] : [{ $skip: page * delta }, { $limit: delta }]
			}
		});

		const result: any[] = await this.collection.aggregate(aggr, options).toArray();

		return <PaginationResponse<Entity>>{
			data: result[0].data ? result[0].data : [],
			totalDocuments: result[0].metadata[0] ? result[0].metadata[0].total : 0
		};

	}

	public async createIfDoesntExists(
		document: Entity,
		user?: string, options?: UpdateOneOptions
	) {

		const copy = ObjectUtils.deepClone(document);
		const pOptions = options || {};
		pOptions.upsert = true;
		const now = this.getNowDate();

		return this.collection.updateOne(
			<any>{ [this.configuration.idAttribute]: copy[this.configuration.idAttribute] },
			<any>{
				$setOnInsert: {
					...copy,
					...(this.configuration.auditEditedEntries ? {
						[<keyof AuditedDocument>'_auditCreate']: this.auditUpdateField(user, now),
						[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user, now)
					} : {})

				}
			},
			pOptions
		);
	}

	public async insertOrUpdateOne(
		document: Entity,
		user?: string, options?: UpdateOneOptions,
		ignoreAuditUpdate?: boolean
	) {

		const copy = ObjectUtils.deepClone(document);
		delete copy._id;
		const pOptions = options || {};
		pOptions.upsert = true;
		const now = this.getNowDate();

		return this.collection.updateOne(
			<any>{ [this.configuration.idAttribute]: copy[this.configuration.idAttribute] },
			<any>{
				$set: ignoreAuditUpdate ? copy : {
					[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user, now),
					...copy
				},
				$setOnInsert: ignoreAuditUpdate ? {
					[<keyof AuditedDocument>'_auditCreate']: this.auditUpdateField(user, now),
					[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user, now)
				} :
				{ [<keyof AuditedDocument>'_auditCreate']: this.auditUpdateField(user, now) }
			},
			pOptions
		);
	}

	public async insertOrUpdateMany(
		documents: Entity[],
		user?: string, options?: CollectionBulkWriteOptions,
		ignoreAuditUpdate?: boolean
	) {

		const nOptions = options || {};
		nOptions.ordered = false;
		const now = this.getNowDate();

		return this.collection.bulkWrite(
			documents.map(d => {
				const copy = ObjectUtils.deepClone(d);
				delete copy._id;
				return <any>{ // TODO check why
					updateOne: {
						filter: { [this.configuration.idAttribute]: d[this.configuration.idAttribute] },
						update: {
							$set: ignoreAuditUpdate ? copy : {
								[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user, now),
								...copy
							},
							$setOnInsert: ignoreAuditUpdate ? {
								[<keyof AuditedDocument>'_auditCreate']: this.auditUpdateField(user, now),
								[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user, now)
							} :
							{ [<keyof AuditedDocument>'_auditCreate']: this.auditUpdateField(user, now) }
						},
						upsert: true
					}
				};
			}),
			nOptions
		);
	}


	public async insertOne(
		document: Entity,
		user?: string, options?: UpdateOneOptions
	) {

		if (this.configuration.auditEditedEntries) {
			document = this.addAuditFields(document, user);
		}

		if ((<any>document)._id) {
			delete (<any>document)._id;
		}

		// TODO: Check what happens to OptionalId in TS 3.8 and remove any
		return this.collection.insertOne(<any>document, options);

	}

	public async insertMany(
		documents: Entity[],
		user?: string, options?: UpdateOneOptions
	) {

		let documentsToInsert = documents;
		if (this.configuration.auditEditedEntries) {
			documentsToInsert = documentsToInsert.map(document => this.addAuditFields(document, user));
		}

		// TODO: Check what happens to OptionalId in TS 3.8 and remove any
		return this.collection.insertMany(<any[]>documentsToInsert, options);
	}

	public async updateOne(
		filter: FilterQuery<Entity>,
		update: UpdateQuery<Entity> | Partial<Entity>,
		user?: string, options?: UpdateOneOptions
	) {

		if (this.configuration.auditEditedEntries) {
			this.applyUpdateField(update, user);
		}

		return this.collection.updateOne(filter, update, options);

	}

	public async updateMany(
		filter: FilterQuery<Entity>,
		update: UpdateQuery<Entity> | Partial<Entity>,
		user?: string, options?: UpdateOneOptions
	) {

		if (this.configuration.auditEditedEntries) {
			this.applyUpdateField(update, user);
		}
		return this.collection.updateMany(filter, update, options);

	}

	/**
	 * Updates an entity using it's id
	 * @param document
	 * @param user
	 */
	public async updateDocument(
		document: (Pick<Entity, EntityId> & Partial<Entity>),
		user?: string, options?: UpdateOneOptions
	) {

		if (document._id) {
			delete document._id;
		}
		return this.updateOne(
			<any>{ [this.configuration.idAttribute]: document[this.configuration.idAttribute] },
			{ $set: document },
			user, options
		);

	}

	/**
	 * Updates an array of entities using it's id for each entitiy
	 * @param documents
	 * @param user
	 */
	public async updateDocuments(
		documents: (Pick<Entity, EntityId> & Partial<Entity>)[],
		user?: string, options?: CollectionBulkWriteOptions
	) {

		const nOptions = options || {};
		nOptions.ordered = true;
		return this.collection.bulkWrite(
			documents.map(d => {
				const copy = ObjectUtils.deepClone(d);
				delete copy._id;
				return <any>{ // TODO check why
					updateOne: {
						filter: { [this.configuration.idAttribute]: d[this.configuration.idAttribute] },
						update: {
							$set: {
								[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user),
								...copy
							},
						}
					}
				};
			}),
			nOptions
		);

	}

	public async deleteOne(
		filter: FilterQuery<Entity>,
		user?: string, options?: CommonOptions & { bypassDocumentValidation?: boolean },
	) {

		if (this.configuration.auditDeletedEntries) {
			const docToBelDEleted = await this.collection.findOne(filter);
			if (docToBelDEleted) {
				docToBelDEleted[<keyof AuditedDocument>'_auditUpdate'] = this.auditUpdateField(user);
				try {
					await this.collectionDeletedEntries.insertOne(
						<any>docToBelDEleted, options
					);
				} catch (error) {
					if (options && options.session) {
						this.collectionDeletedEntries = await this.configuration.dataSource.getConnection().createCollection(
							this.deletedCollectionPrefix + this.capitalize(this.configuration.collectionName)
						);

						await this.collectionDeletedEntries.insertOne(
							<any>docToBelDEleted, options
						);
					} else {
						throw error;
					}
				}
			}
		}

		return this.collection.deleteOne(filter, options);

	}

	public async deleteMany(
		filter: FilterQuery<Entity>,
		user?: string, options?: CommonOptions & { bypassDocumentValidation?: boolean }
	) {

		if (this.configuration.auditDeletedEntries) {
			const docsToBelDEleted = await this.collection.find(filter).toArray();
			if (docsToBelDEleted && docsToBelDEleted.length > 0) {
				await this.collectionDeletedEntries.bulkWrite(docsToBelDEleted.map(d => {
					delete d._id;
					d = this.addAuditFields(d, user);
					return <BulkWriteInsertOneOperation<Entity>>{
						insertOne: { document: d }
					};
				}), { ordered: false });
			}
		}

		return this.collection.deleteMany(filter, options);

	}

	public async deleteDocument(
		id: Entity[EntityId],
		user?: string, options?: CommonOptions & { bypassDocumentValidation?: boolean }
	) {
		return this.deleteOne(<any>{ [this.configuration.idAttribute]: id }, user, options);
	}

	public async deleteDocuments(
		ids: Entity[EntityId][],
		user?: string, options?: CommonOptions & { bypassDocumentValidation?: boolean }
	) {
		return this.deleteMany(<any>{ [this.configuration.idAttribute]: { $in: ids } }, user, options);
	}

	public getCollection() {
		return this.collection;
	}

	public getConfiguration() {
		return this.configuration;
	}

	// Private methods

	private getNowDate() {
		const now = new Date();
		return now.getTime();
	}

	private capitalize(inp: string) {
		return inp.charAt(0).toUpperCase() + inp.slice(1);
	}

	private isUpdateQuery(update: UpdateQuery<Entity> | Partial<Entity>): update is UpdateQuery<Entity> {
		return (
			update.$set !== undefined ||
			update.$unset !== undefined ||
			update.$inc !== undefined ||
			update.$setOnInsert !== undefined ||
			update.$addToSet !== undefined ||
			update.$max !== undefined ||
			update.$min !== undefined ||
			update.$pull !== undefined ||
			update.$pullAll !== undefined ||
			update.$pop !== undefined ||
			update.$push !== undefined ||
			update.$rename !== undefined ||
			update.$currentDate !== undefined ||
			update.$bit !== undefined
		);
	}

	private applyUpdateField(update: UpdateQuery<Entity> | Partial<Entity>, user?: string) {
		if (this.isUpdateQuery(update)) {
			if (update.$set) {
				(<any>update.$set)[<keyof AuditedDocument>'_auditUpdate'] = this.auditUpdateField(user);
			} else {
				update.$set = <any>{
					[<keyof AuditedDocument>'_auditUpdate']: this.auditUpdateField(user)
				};
			}
		} else {
			update[<keyof AuditedDocument>'_auditUpdate'] = this.auditUpdateField(user);
		}
	}

	private auditUpdateField(user?: string, useNow?: number): AuditedDocument['_auditUpdate'] {
		const now = useNow || this.getNowDate();
		return {
			date: now,
			user: user || this.userNotProvided
		};
	}

	private addAuditFields(document?: Entity, user?: string, useNow?: number): Entity {
		const copy = document ? ObjectUtils.deepClone(document) : <Entity>{};
		const now = useNow || this.getNowDate();
		copy._auditCreate = copy._auditCreate || {
			date: now,
			user: user || this.userNotProvided
		};
		copy._auditUpdate = copy._auditCreate || {
			date: now,
			user: user || this.userNotProvided
		};
		return copy;
	}

}
