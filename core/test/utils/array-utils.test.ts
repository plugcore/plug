/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ArrayUtils } from '../../src/utils/array.utils';

@TestClass()
export class ArrayUtilsTest extends PlugTest {

	@Test()
	public append() {
		this.assert.deepEqual(ArrayUtils.append([1, '2']), [1, '2']);
		this.assert.deepEqual(ArrayUtils.append([1, '2'], [false]), [false, 1, '2']);
		this.assert.deepEqual(ArrayUtils.append(1), [1]);
		this.assert.deepEqual(ArrayUtils.append(1, [2]), [2, 1]);
	}

	@Test()
	public onlySame() {
		this.assert.deepEqual(
			ArrayUtils.onlySame([1, 2, '3'], [1, '2']),
			[1]
		);
		this.assert.deepEqual(
			ArrayUtils.onlySame([1, 2, 3], [1, 2, 3]),
			[1, 2, 3]
		);
	}

	@Test()
	public flat() {
		this.assert.deepEqual(
			ArrayUtils.flat([[1, 2], [3, '4']]),
			[1, 2, 3, '4']
		);
	}

	@Test()
	public flatAndRemoveDuplicates() {
		this.assert.deepEqual(
			ArrayUtils.flatAndRemoveDuplicates([[1, '1', 1, 2], [3, '4', '4']]),
			[1, '1', 2, 3, '4']
		);
	}

	@Test()
	public removeDuplicates() {
		this.assert.deepEqual(
			ArrayUtils.removeDuplicates([1, '1', 1, 2, '2', '2', '3']),
			[1, '1', 2, '2', '3']
		);
	}

	@Test()
	public countOcurrences() {
		this.assert.deepEqual(
			ArrayUtils.countOcurrences([1, 1, 1, 2, 3, 3]),
			{ 1: 3, 2: 1, 3: 2 }
		);
		this.assert.deepEqual(
			ArrayUtils.countOcurrences(['1', '1', '1', '2', '3', '3']),
			{ '1': 3, '2': 1, '3': 2 }
		);
	}

	@Test()
	public filterArrs() {
		this.assert.deepEqual(
			ArrayUtils.filterArrs([1, '2', false, 2, 3], [1]),
			['2', false, 2, 3]
		);
		this.assert.deepEqual(
			ArrayUtils.filterArrs([1, '2', false, 2, 3], [1, '2', false, 2, 3]),
			[]
		);
	}

	@Test()
	public contentsAreTheSame() {
		this.assert.ok(
			ArrayUtils.contentsAreTheSame([1, '2', false, 2, 3], [1, '2', false, 2, 3])
		);
		this.assert.ok(
			ArrayUtils.contentsAreTheSame([1, '2', false, 2, 3], [1, false, 2, '2', 3])
		);
		this.assert.ok(
			!ArrayUtils.contentsAreTheSame([1, '2', false, 2, 3], [1, '2', false, 2])
		);
		this.assert.ok(
			!ArrayUtils.contentsAreTheSame([1, '2', false, 2, 3], [1, '2', false, '2'])
		);
	}

	@Test()
	public someContentsAreTheSame() {
		this.assert.ok(
			ArrayUtils.someContentsAreTheSame([1, '2', false, 2, 3], [1, '2', false, 2, 3])
		);
		this.assert.ok(
			ArrayUtils.someContentsAreTheSame([1, '2', false, 2, 3], [1, '2'])
		);
		this.assert.ok(
			!ArrayUtils.someContentsAreTheSame([1, '2', false, 2, 3], ['1', true])
		);
	}

	@Test()
	public orderedNumArray() {
		this.assert.deepEqual(
			ArrayUtils.orderedNumArray(4),
			[0, 1, 2, 3]
		);
		this.assert.deepEqual(
			ArrayUtils.orderedNumArray(4, 1),
			[1, 2, 3, 4]
		);
	}

	@Test()
	public groupBy() {
		const ex1 = [
			{ a: 1, b: { test1: 1 } },
			{ a: 1, b: { test2: 2 } }
		];
		const ex2 = [
			{ a: 2, b: { test1: 1 } },
			{ a: 2, b: { test2: 2 } }
		];
		this.assert.deepEqual(
			ArrayUtils.groupBy(ex1.concat(ex2), 'a'),
			{ 1: ex1, 2: ex2 }
		);
	}

	@Test()
	public indexByField() {
		const obj1 = { a: 1, b: { test1: 1 } };
		const obj2 = { a: 2, b: { test2: 2 } };
		this.assert.deepEqual(
			ArrayUtils.indexByField([obj1, obj2], 'a'),
			{ 1: obj1, 2: obj2 }
		);
	}

}
