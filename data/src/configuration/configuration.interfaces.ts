import { MongoClientOptions } from 'mongodb';

export interface MongodbConnection {
	name: string;
	url: string;
	databaseName: string;
	options?: Omit<MongoClientOptions, 'logger' | 'loggerLevel'>;
}

export interface PlugDataConfiguration {
	defaultConnection: MongodbConnection;
	connections?: MongodbConnection[];
}

declare module '@plugdata/core' {
	export interface IConfiguration<T> {
		data?: PlugDataConfiguration;
	}
	export class ProjectConfiguration<T = undefined> implements IConfiguration<T> {
		data?: PlugDataConfiguration;
	}
}
