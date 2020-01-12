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

declare module '@plugdata/core/types/src/configuration/configuration.interfaces' {
	interface Configuration {
		data?: PlugDataConfiguration;
	}
}

