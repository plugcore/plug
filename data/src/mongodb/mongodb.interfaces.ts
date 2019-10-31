/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Collection as MCollection, IndexOptions } from 'mongodb';

export interface Collection<T> extends MCollection<T> { }

export interface IGetCollectionOptions<T = any> {
	createIfDoesntExists?: boolean;
	ensureIndexes?: { key: Record<string | keyof T, number>; options?: IndexOptions }[];
}
