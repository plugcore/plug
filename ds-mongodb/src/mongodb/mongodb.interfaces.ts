import { ClientSession, Collection as MCollection, FilterQuery, IndexOptions, IndexSpecification } from 'mongodb';
import { MongoDbDatasource } from './mongodb.datasource';

export interface Collection<T> extends MCollection<T> { }

export interface IGetCollectionOptions<T = any> {
	createIfDoesntExists?: boolean;
	ensureIndexes?: { key: Record<string | keyof T, number>; options?: IndexOptions }[];
}

export interface AuditedDocument {

	_auditCreate?: {
		date: number;
		user: string | null;
	}
	_auditUpdate?: {
		date: number;
		user: string | null;
	}

}

export interface MongoDbRepositoryCfg<Entity, EntityId extends keyof Entity> {
	dataSource: MongoDbDatasource;
	collectionName: string;
	idAttribute: EntityId;
	/**
	 * Every time you call to insertOne/Many or updateOne/Many it adds
	 * the fields from `AuditedCollection` interface
	 */
	auditEditedEntries?: boolean,
	/**
	 * Every time you call to deleteOne/Many it creates a new Collection
	 * where it sotres the deleted entries. The collection name is `deleted${CollectionName}`
	 */
	auditDeletedEntries?: boolean
	/**
	 * Creates if doesn't exists the following index in the collection.
	 * If the collection doesn't exists it will be created
	 */
	indexes?: IndexSpecification[]
}

export interface DbContext {
	userId?: string;
	session?: ClientSession;
}

export interface PaginationContext {
	sortField?: string;
	sortDirection?: number;
	delta?: number;
	page?: number;
}

export interface PaginationConf<T> {
	context?: PaginationContext;
	fieldsAsLike?: Record<string, string | undefined>;
	textSearch?: string | undefined;
	customQuery?: FilterQuery<T>;
	defaultDelta?: number;
	defaultSort?: {
		field: string;
		direction: number;
	},
	previousAggregationSteps?: any[]
}

export interface PaginationResponse<T> {
	totalDocuments: number;
	data: T[];
}