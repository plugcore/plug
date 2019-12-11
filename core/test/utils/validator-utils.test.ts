import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ValidatorUtils } from '../../src/utils/validator.utils';

@TestClass()
export class ValidatorUtilsTest extends PlugTest {


	@Test()
	public isDefined() {
		this.assert.ok(ValidatorUtils.isDefined(1));
		this.assert.ok(ValidatorUtils.isDefined(false));
		this.assert.ok(ValidatorUtils.isDefined('1'));
		this.assert.ok(ValidatorUtils.isDefined({}));
		this.assert.equal(ValidatorUtils.isDefined(null), false);
		this.assert.equal(ValidatorUtils.isDefined(undefined), false);
		this.assert.ok(ValidatorUtils.isDefined(''));
		this.assert.ok(ValidatorUtils.isDefined('       '));
	}

	@Test()
	public deepEqual() {
		this.assert.ok(ValidatorUtils.deepEqual(<any>undefined, <any>undefined));
		this.assert.equal(ValidatorUtils.deepEqual({}, <any>undefined), false);
		this.assert.equal(ValidatorUtils.deepEqual(<any>undefined, {}), false);
		this.assert.equal(ValidatorUtils.deepEqual({a: 1}, {a: 1, b: 2}), false);
		this.assert.equal(ValidatorUtils.deepEqual({a: 1}, {a: 2}), false);
		this.assert.ok(ValidatorUtils.deepEqual({}, {}));
		this.assert.ok(ValidatorUtils.deepEqual({a: 1}, {a: 1}));
		this.assert.ok(ValidatorUtils.deepEqual({a: {b:2}}, {a: {b:2}}));
		this.assert.ok(ValidatorUtils.deepEqual({a: {b:[1]}}, {a: {b:[1]}}));
		this.assert.equal(ValidatorUtils.deepEqual({a: {b:[1]}}, {a: {b:[1, 2]}}), false);
	}

	@Test()
	public equal() {
		this.assert.equal(ValidatorUtils.equal({a: 1}, {a: 1}), false);
		this.assert.ok(ValidatorUtils.equal(false, false));
		this.assert.ok(ValidatorUtils.equal(1, 1));
		this.assert.ok(ValidatorUtils.equal('0', '0'));
	}

	@Test()
	public isBlank() {
		this.assert.ok(ValidatorUtils.isBlank(''));
		this.assert.ok(ValidatorUtils.isBlank(<any>null));
		this.assert.ok(ValidatorUtils.isBlank(undefined));
		this.assert.ok(ValidatorUtils.isBlank('      '));
		this.assert.equal(ValidatorUtils.isBlank('      1'), false);
		this.assert.equal(ValidatorUtils.isBlank('test    '), false);
	}

	@Test()
	public isNotBlank() {
		this.assert.equal(ValidatorUtils.isNotBlank(''), false);
		this.assert.equal(ValidatorUtils.isNotBlank(<any>null), false);
		this.assert.equal(ValidatorUtils.isNotBlank(undefined), false);
		this.assert.equal(ValidatorUtils.isNotBlank('      '), false);
		this.assert.ok(ValidatorUtils.isNotBlank('      1'));
		this.assert.ok(ValidatorUtils.isNotBlank('test    '));
	}

}
