/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { LoggerOptions } from 'pino';

/**
 * Configuration for initialization tasks, such as start the process to load
 * all dependencies
 */
export interface IInitConfiguration {
	distFolder: string;
}


/**
 * Plug framework configuration file
 */
export interface IConfiguration<T> {
	init: IInitConfiguration;
	// Supported pino log configuration
	log: Pick<LoggerOptions,
	'level' | 'useLevelLabels' | 'changeLevelName' | 'redact' |
	'messageKey' | 'prettyPrint' | 'enabled' | 'base'
	> & { timestamp?: boolean };
	// In this property we can add any custom configuration to the main configuration file
	// to exend it
	custom: T;
}
