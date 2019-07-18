import { TestClass, BeforeTests, Test } from '../../src/test/test.decorators';
import { PlugTest } from '../../src/test/test.shared';
import { ObjectValidatorFactory } from '../../src/object-validator/object-validator.factory';
import { Container } from '../../src/dependecy-injection/di.container';
import { join } from 'path';
import { FsUtils } from '../../src/io/fs.utils';

@TestClass()
export class ObjectVlidatorFactoryTest extends PlugTest {

	private objectValidatorFactory: ObjectValidatorFactory;
	private basicSchema: object;
	private basicDataOk: object;
	private basicDataErrors: object;

	private readonly basePath = join(__dirname, '..', '..', '..', 'test', 'object-validator', 'test-files');
	private readonly basicDataOkPath = join(this.basePath, 'basic-data-ok.json');
	private readonly basicDataErrorsPath = join(this.basePath, 'basic-data-errors.json');
	private readonly basicSchemaPath = join(this.basePath, 'basic-schema.json');

	@BeforeTests()
	public async beforeTests() {

		this.objectValidatorFactory = await Container.get(ObjectValidatorFactory);
		this.basicDataOk = await FsUtils.loadJsonFile<object>(this.basicDataOkPath);
		this.basicDataErrors = await FsUtils.loadJsonFile<object>(this.basicDataErrorsPath);
		this.basicSchema = await FsUtils.loadJsonFile<object>(this.basicSchemaPath);

	}

	@Test()
	public async compile() {

		const compiledFromObject = this.objectValidatorFactory.compile(this.basicSchema);
		const resultOk = this.objectValidatorFactory.validate(compiledFromObject, this.basicDataOk);
		const resultErrors = this.objectValidatorFactory.validate(compiledFromObject, this.basicDataErrors);
		
		this.assert.ok(resultOk.valid);
		this.assert.ok(resultOk.errors.length === 0);

		this.assert.ok(!resultErrors.valid);
		this.assert.ok(resultErrors.errors.length > 0);

	}

	@Test()
	public async compileFromFile() {

		const compiledFromObject = await this.objectValidatorFactory.compileFromFile(this.basicSchemaPath);
		const resultOk = this.objectValidatorFactory.validate(compiledFromObject, this.basicDataOk);
		const resultErrors = this.objectValidatorFactory.validate(compiledFromObject, this.basicDataErrors);
		
		this.assert.ok(resultOk.valid);
		this.assert.ok(resultOk.errors.length === 0);

		this.assert.ok(!resultErrors.valid);
		this.assert.ok(resultErrors.errors.length > 0);

	}

	@Test()
	public async validateWithSchema() {

		const resultOk = this.objectValidatorFactory.validate(this.basicSchema, this.basicDataOk);
		const resultErrors = this.objectValidatorFactory.validate(this.basicSchema, this.basicDataErrors);
		
		this.assert.ok(resultOk.valid);
		this.assert.ok(resultOk.errors.length === 0);

		this.assert.ok(!resultErrors.valid);
		this.assert.ok(resultErrors.errors.length > 0);

	}

}
