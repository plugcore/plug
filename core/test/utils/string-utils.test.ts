import { Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { StringUtils } from '../../src/utils/string.utils';

@TestClass()
export class StringUtilsTest extends PlugTest {

	@Test()
	public objToStr() {
		const exampleObj = {
			a: 1,
			b: '2',
			c: false,
			d: [1, 2],
			e: { e: undefined }
		};
		this.assert.deepEqual(
			StringUtils.objToStr(exampleObj),
			'{ a: 1, b: \'2\', c: false, d: [ 1, 2 ], e: { e: undefined } }'
		);
	}

	@Test()
	public arrayToString() {
		const a = [1, 2, '3'];
		this.assert.equal(
			StringUtils.arrayToString(a),
			'1, 2, 3'
		);
	}

	@Test()
	public normalizeText() {
		const unNormalized = 'aáeéií oó?*^¨Ç?!"·$PPSS';
		this.assert.equal(StringUtils.normalizeText(unNormalized), 'aaeeii oo CPPSS');
		this.assert.equal(StringUtils.normalizeText(unNormalized, true), 'aaeeii oo cppss');
		this.assert.equal(StringUtils.normalizeText(unNormalized, true, true), 'aaeeii-oo-cppss');
	}

	@Test()
	public createRandomId() {
		const id1 = StringUtils.createRandomId();
		const id2 = StringUtils.createRandomId();
		const id3 = StringUtils.createRandomId(10);
		this.assert.notEqual(id1, id2);
		this.assert.ok(id3.length === 10);
	}

}
