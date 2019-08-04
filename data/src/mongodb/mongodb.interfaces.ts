import { Collection as MCollection, IndexOptions } from 'mongodb';

export interface Collection<T> extends MCollection<T> { }

export interface IGetCollectionOptions<T = any> {
	createIfDoesntExists?: boolean;
	ensureIndexes?: { key: Record<string | keyof T, number>; options?: IndexOptions }[];
}
