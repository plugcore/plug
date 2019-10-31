/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
