import { MongoClientOptions } from 'mongodb';

export interface MongodbConnection {
	name: string;
	url: string;
	databaseName: string;
	options?: Omit<MongoClientOptions, 'logger' | 'loggerLevel'>;
}

export interface plugcoreConfiguration {
	defaultConnection: MongodbConnection;
	connections?: MongodbConnection[];
}

declare module '@plugcore/core/types/src/configuration/configuration.interfaces' {
	interface Configuration {
		data?: plugcoreConfiguration;
	}
}

