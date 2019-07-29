import { ProjectConfiguration } from '@plugdata/core';
import { MongoClientOptions } from 'mongodb';

/**
 * Plug framework configuration file
 */
export interface IDataConfiguration {
	data?: {
		url: string;
		databaseName: string;
		options?: Omit<MongoClientOptions, 'logger' | 'loggerLevel'>;
	};
}

export type TDataConfugration = IDataConfiguration & ProjectConfiguration;
