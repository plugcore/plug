import { BeforeTests, Test, TestClass } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ObjectMapper } from '../../src/object-mapper/object-mapper.service';
import { Container } from '../../src/dependecy-injection/di.container';
import { ObjectMapping } from '../../src/object-mapper/object-mapper.interfaces';

/**
 * Tests from https://github.com/wankdanker/node-object-mapper
 */
@TestClass()
export class ObjectMapperTest extends PlugTest {

	private objectMapper: ObjectMapper;

	@BeforeTests()
	public async beforeTests() {
		this.objectMapper = await Container.get(ObjectMapper);
	}

	@Test()
	public async map() {
		const sourceObject = { foo: 'blah', bar: 'something' };
		const objectMapping = {
			foo: [
				{ key: 'foo', transform: (value: string) => value + '_foo' },
				{ key: 'baz', transform: (value: string) => value + '_baz' },
			],
			bar: 'bar'
		};
		const resultObject = this.objectMapper.map(objectMapping, sourceObject);
		const expectedResult = { foo: 'blah_foo', baz: 'blah_baz', bar: 'something' };
		this.assert.deepEqual(resultObject, expectedResult);
	}

	@Test()
	public async mapAndMerge() {
		let resultObject: any = { prev: 'bofre', num: -1 };
		const sourceObject = { foo: 'blah', bar: 'something' };
		const objectMapping = {
			foo: [
				{ key: 'foo', transform: (value: string) => value + '_foo' },
				{ key: 'baz', transform: (value: string) => value + '_baz' },
			],
			bar: 'bar'
		};
		resultObject = this.objectMapper.mapAndMerge(objectMapping, sourceObject, resultObject);
		const expectedResult = { foo: 'blah_foo', baz: 'blah_baz', bar: 'something', prev: 'bofre', num: -1 };
		this.assert.deepEqual(resultObject, expectedResult);
	}

	@Test()
	public async createMapping() {
		const sourceObject = {
			sku: '12345',
			upc: '99999912345X',
			title: 'Test Item',
			description: 'Description of test item',
			length: 5,
			width: 2,
			height: 8,
			inventory: {
				onHandQty: 12
			}
		};
		const objectMapping1 = {
			sku: 'Envelope.Request.Item.SKU',
			upc: 'Envelope.Request.Item.UPC',
			title: 'Envelope.Request.Item.ShortTitle',
			description: 'Envelope.Request.Item.ShortDescription',
			length: 'Envelope.Request.Item.Dimensions.Length',
			width: 'Envelope.Request.Item.Dimensions.Width',
			height: 'Envelope.Request.Item.Dimensions.Height',
			['inventory.onHandQty']: 'Envelope.Request.Item.Inventory'
		};
		const mappingFunc: ObjectMapping<any, any> = this.objectMapper.createMapping(objectMapping1);

		const newObject = mappingFunc(sourceObject);
		const expectedObject = {
			Envelope: {
				Request: {
					Item: {
						SKU: '12345',
						UPC: '99999912345X',
						ShortTitle: 'Test Item',
						ShortDescription: 'Description of test item',
						Dimensions: {
							Length: 5,
							Width: 2,
							Height: 8
						},
						Inventory: 12
					}
				}
			}
		};

		this.assert.deepEqual(newObject, expectedObject);
	}
}

