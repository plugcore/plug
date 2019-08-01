import {
	RequiredProperty, IsArray, IsNumber, IsObject, IsString, IsBoolean
} from '../../src/object-validator/object-validator.decorators';
import { ObjectValidatorUtils } from '../../src/object-validator/object-validator.utils';
import { Test, TestClass, BeforeTests } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ObjectValidatorFactory } from '../../src/object-validator/object-validator.factory';
import { Container } from '../../src/dependecy-injection/di.container';
import { join } from 'path';
import { FsUtils } from '../../src/io/fs.utils';

@TestClass()
export class ObjectValidatorDecorators extends PlugTest {

	private objectValidatorFactory: ObjectValidatorFactory;
	private basicDataOk: object;
	private basicDataErrors: object;
	private arrayDataOk: object;
	private arrayDataErrors: object;

	private readonly basePath = join(__dirname, '..', '..', '..', 'test', 'object-validator', 'test-files');
	private readonly basicDataOkPath = join(this.basePath, 'custom-data-ok.json');
	private readonly basicDataErrorsPath = join(this.basePath, 'custom-data-errors.json');
	private readonly arrayDataOkPath = join(this.basePath, 'array-data-ok.json');
	private readonly arrayDataErrorsPath = join(this.basePath, 'array-data-errors.json');

	@BeforeTests()
	public async beforeTests() {
		this.objectValidatorFactory = await Container.get(ObjectValidatorFactory);
		this.basicDataOk = await FsUtils.loadJsonFile<object>(this.basicDataOkPath);
		this.basicDataErrors = await FsUtils.loadJsonFile<object>(this.basicDataErrorsPath);
		this.arrayDataOk = await FsUtils.loadJsonFile<object>(this.arrayDataOkPath);
		this.arrayDataErrors = await FsUtils.loadJsonFile<object>(this.arrayDataErrorsPath);
	}


	@Test()
	public async testClass() {

		// TODO: Improve test for every decorator type

		const schema = ObjectValidatorUtils.generateJsonSchema(ObjectValidatorDecoratorsTestClass);

		const compiledFromSchema = this.objectValidatorFactory.compile(schema);
		const resultOk = this.objectValidatorFactory.validate(compiledFromSchema, this.basicDataOk);
		const resultErrors = this.objectValidatorFactory.validate(compiledFromSchema, this.basicDataErrors);

		this.assert.ok(resultOk.valid);
		this.assert.ok(resultOk.errors.length === 0);

		this.assert.ok(!resultErrors.valid);
		this.assert.ok(resultErrors.errors.length > 0);

	}

	@Test()
	public async testArrays() {

		// TODO: Improve test for every decorator type

		const schema = ObjectValidatorUtils.generateJsonSchema(ObjectValidatorDecoratorsTestClass, { asArray: true });

		const compiledFromSchema = this.objectValidatorFactory.compile(schema);
		const resultOk = this.objectValidatorFactory.validate(compiledFromSchema, this.arrayDataOk);
		const resultErrors = this.objectValidatorFactory.validate(compiledFromSchema, this.arrayDataErrors);
		const resultErrors2 = this.objectValidatorFactory.validate(compiledFromSchema, {});

		this.assert.ok(resultOk.valid);
		this.assert.ok(resultOk.errors.length === 0);

		this.assert.ok(!resultErrors.valid);
		this.assert.ok(resultErrors.errors.length > 0);

		this.assert.ok(!resultErrors2.valid);
		this.assert.ok(resultErrors2.errors.length > 0);

	}

}

class ObjectValidatorDecoratorsTestSubClass {

	@IsNumber()
	public numberProp: number;

	@IsString()
	public stringProp: string;

	@RequiredProperty()
	@IsBoolean()
	public boolPropr: boolean;

}

class ObjectValidatorDecoratorsTestClass {

	@RequiredProperty()
	@IsNumber({
		minimum: 2
	})
	public numberProp: number;

	@IsString()
	public stringProp: string;

	@IsArray()
	public arrayProp: string[];

	@RequiredProperty()
	@IsObject(ObjectValidatorDecoratorsTestSubClass)
	public subPropr: ObjectValidatorDecoratorsTestSubClass;

}
