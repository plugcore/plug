import {
	RequiredProperty, ValidArray, ValidNumber, ValidObject, ValidString, ValidBoolean
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

	private readonly basePath = join(__dirname, '..', '..', '..', 'test', 'object-validator', 'test-files');
	private readonly basicDataOkPath = join(this.basePath, 'custom-data-ok.json');
	private readonly basicDataErrorsPath = join(this.basePath, 'custom-data-errors.json');

	@BeforeTests()
	public async beforeTests() {
		this.objectValidatorFactory = await Container.get(ObjectValidatorFactory);
		this.basicDataOk = await FsUtils.loadJsonFile<object>(this.basicDataOkPath);
		this.basicDataErrors = await FsUtils.loadJsonFile<object>(this.basicDataErrorsPath);
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

}

class ObjectValidatorDecoratorsTestSubClass {

	@ValidNumber()
	public numberProp: number;

	@ValidString()
	public stringProp: string;

	@RequiredProperty()
	@ValidBoolean()
	public boolPropr: boolean;

}

class ObjectValidatorDecoratorsTestClass {

	@RequiredProperty()
	@ValidNumber()
	public numberProp: number;

	@ValidString()
	public stringProp: string;

	@ValidArray()
	public arrayProp: string[];

	@RequiredProperty()
	@ValidObject(ObjectValidatorDecoratorsTestSubClass)
	public subPropr: ObjectValidatorDecoratorsTestSubClass;

}
