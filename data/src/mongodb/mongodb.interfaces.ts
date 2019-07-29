import { Collection as MCollection } from 'mongodb';

export interface Collection<T> extends MCollection<T> {}
