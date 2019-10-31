/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { LogLevels } from './log.enums';

export interface LogEntry {
	level: LogLevels;
	message: string;
	timestamp: number;
	clazz: string;
	// ext: string; TODO Extensions
}

export interface LogQueueEntry {
	entry: LogEntry;
	filePath: string;
}
