import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ObjectUtils } from '../../src/utils/object.utils';

@TestClass()
export class ObjectUtilsTest extends PlugTest {

	@Test()
	public deepReduction() {
		const exObject = {
			a: undefined,
			b: null,
			c: 1,
			d: {},
			e: { e1: 1 },
			f: [],
			g: [1],
			h: false,
			i: true,
			j: '',
			k: 'k'
		};
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'a'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'b'));
		ObjectUtils.deepReduction(exObject);
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'c'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'd'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'e'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'f'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'g'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'j'));
		this.assert.ok(Object.prototype.hasOwnProperty.call(exObject, 'k'));
		this.assert.ok(!Object.prototype.hasOwnProperty.call(exObject, 'a'));
		this.assert.ok(!Object.prototype.hasOwnProperty.call(exObject, 'b'));
	}

	@Test()
	public detectChanges() {
		const exObject1 = {
			a: undefined,
			b: null,
			c: 1,
			d: {},
			e: { e1: 1 },
			f: [],
			g: [1],
			h: false,
			i: true,
			j: '',
			k: 'k'
		};
		const exObject2 = {
			a: 1,
			b: 1,
			c: 1,
			d: {},
			e: { e1: 1 },
			f: [],
			g: [1],
			h: false,
			i: true,
			j: '',
			k: 'k'
		};
		// TODO Improve tests
		const changes = ObjectUtils.detectChanges(exObject1, exObject2);
		this.assert.ok(Object.keys(changes).length === 2);
		this.assert.ok(changes.a === 1);
		this.assert.ok(changes.b === 1);
	}

	@Test()
	public detectChangesBetweenArrays() {
		const arr1 = [1, 1, '2', '2', true, true, false, false, {}, [], { a: 1 }];
		const arr2 = [1, 2, '2', '3', true, false, false, true, {}, [], { a: 1 }];
		const arrDiff = ObjectUtils.detectChangesBetweenArrays(arr1, arr2);
		// TODO Improve tests
		this.assert.deepEqual(arrDiff, [2, '3', false, true]);
	}

	@Test()
	public deepMerge() {
		const obj1 = {
			a: 1,
			b: 2,
			c: false,
			d: null,
			f: {},
			g: []
		};
		const obj2 = {
			a: 2,
			b: '3',
			c: true,
			d: false,
			f: { a: 1 },
			g: [1, 2]
		};
		// TODO Improve tests
		this.assert.deepEqual(
			ObjectUtils.deepMerge(obj1, obj2),
			obj2
		);
	}

	@Test()
	public mergeArrays() {
		const arr1 = [1, '2', { a: 1 }];
		const arr2 = [1, '3', { b: 1 }];
		// TODO Improve tests
		this.assert.deepEqual(
			ObjectUtils.mergeArrays(arr1, arr2),
			[1, '3', { a: 1, b: 1 }]
		);
	}

	@Test()
	public deepClone() {
		const obj1 = { a: 1, b: { c: 1 } };
		const newObj = ObjectUtils.deepClone(obj1);
		this.assert.ok(obj1 !== newObj);
		this.assert.ok(obj1.b !== newObj.b);
	}

	@Test()
	public cleanObject() {
		const obj1 = {
			a: 1,
			b: 2,
			c: false,
			d: null,
			f: {},
			g: []
		};
		const result = { a: 1, b: 2, c: false, f: {}, g: [] };
		// TODO Improve tests
		this.assert.deepEqual(ObjectUtils.cleanObject(obj1), result);
	}

	@Test()
	public cleanEmptyObjects() {
		const obj = {
			a: 1,
			b: {}
		};
		// TODO Improve tests
		this.assert.deepEqual(ObjectUtils.cleanEmptyObjects(obj), { a: 1 });
	}

	@Test()
	public cleanEmptyArrays() {
		const obj = {
			a: 1,
			b: []
		};
		// TODO Improve tests
		this.assert.deepEqual(ObjectUtils.cleanEmptyArrays(obj), { a: 1 });
	}



	@Test()
	public walkThroughObject() {
		const testObj = {
			a: [2],
			b: {
				c: 2,
				d: 't'
			},
			e: 't2'
		};
		const result = [
			{ value: 2, objRef: [2], key: '0' },
			{ value: 2, objRef: { c: 2, d: 't' }, key: 'c' },
			{ value: 't', objRef: { c: 2, d: 't' }, key: 'd' },
			{ value: 't2', objRef: { a: [2], b:{
				c: 2,
				d: 't'
			}, e: 't2' }, key: 'e'}
		];
		// TODO Improve tests
		this.assert.deepEqual(result, ObjectUtils.walkThroughObject(testObj));

	}

	@Test()
	public deepAssign() {
		const obj1 = {
			a: [2, 2],
			b: {
				c: 1,
				d: 't'
			}
		};
		const obj2 = {
			a: [2],
			b: {
				c: 2,
			},
			e: 't2'
		};
		const result = {
			a: [2],
			b: {
				c: 2,
				d: 't'
			},
			e: 't2'
		};
		// TODO Improve tests
		this.assert.deepEqual(result, ObjectUtils.deepAssign(obj1, obj2));
	}

}
