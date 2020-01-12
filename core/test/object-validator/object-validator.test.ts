import { join } from 'path';
import { Container } from '../../src/dependecy-injection/di.container';
import { FsUtils } from '../../src/io/fs.utils';
import { ObjectValidator } from '../../src/object-validator/object-validator.service';
import { BeforeTests, Test } from '../../src/test/test.decorators';
import { AsserterService } from '../../src/test/test.shared';
import { MyCustomModel } from './object-validator.models';

export class ObjectValidatorDecorators extends AsserterService {

	private objectValidator: ObjectValidator;
	private jsonFileSchema: Record<string, any>;
	private jsonFileDataOk: Record<string, any>;
	private jsonFileDataError: Record<string, any>;
	private customClassDataOk: MyCustomModel;
	private customClassDataError: MyCustomModel;

	private readonly basePath = join(__dirname, '..', '..', '..', 'test', 'object-validator', 'test-files');
	private jsonFileSchemaPath = join(this.basePath, 'json-file-schema.json');
	private jsonFileDataOkPath = join(this.basePath, 'json-file-data-ok.json');
	private jsonFileDataErrorPath = join(this.basePath, 'json-file-data-errors.json');
	private customClassDataOkPath = join(this.basePath, 'custom-class-data-ok.json');
	private customClassDataErrorPath = join(this.basePath, 'custom-class-data-errors.json');

	@BeforeTests()
	public async beforeTests() {
		this.objectValidator = await Container.get(ObjectValidator);
		this.jsonFileSchema = await FsUtils.loadJsonFile<Record<string, any>>(this.jsonFileSchemaPath);
		this.jsonFileDataOk = await FsUtils.loadJsonFile<Record<string, any>>(this.jsonFileDataOkPath);
		this.jsonFileDataError = await FsUtils.loadJsonFile<Record<string, any>>(this.jsonFileDataErrorPath);
		this.customClassDataOk = await FsUtils.loadJsonFile<MyCustomModel>(this.customClassDataOkPath);
		this.customClassDataError = await FsUtils.loadJsonFile<MyCustomModel>(this.customClassDataErrorPath);
	}

	@Test()
	public async validateWithObject() {
		const result = this.objectValidator.validate(this.jsonFileSchema, this.jsonFileDataOk);
		const resultError = this.objectValidator.validate(this.jsonFileSchema, this.jsonFileDataError);
		this.assert.ok(result.valid);
		this.assert.deepEqual(result.errors, []);
		this.assert.equal(resultError.valid, false);
		this.assert.equal(resultError.errors.length, 2);
	}

	@Test()
	public async compile() {
		const compiledFunction = this.objectValidator.compile(this.jsonFileSchema);
		this.assert.equal(typeof compiledFunction, 'function');
	}

	@Test()
	public async compileFromFile() {
		const compiledFunction = await this.objectValidator.compileFromFile(this.jsonFileSchemaPath);
		this.assert.equal(typeof compiledFunction, 'function');
	}

	@Test()
	public async validateWithFunction() {
		const compiledFunction = this.objectValidator.compile(this.jsonFileSchema);
		const result = this.objectValidator.validate(compiledFunction, this.jsonFileDataOk);
		const resultError = this.objectValidator.validate(compiledFunction, this.jsonFileDataError);
		this.assert.ok(result.valid);
		this.assert.deepEqual(result.errors, []);
		this.assert.equal(resultError.valid, false);
		this.assert.equal(resultError.errors.length, 2);
	}

	@Test()
	public async compileFromClass() {
		const compiledFunction = this.objectValidator.compileFromClass(MyCustomModel);
		this.assert.equal(typeof compiledFunction, 'function');
		const compiledFunctionAsArray = this.objectValidator.compileFromClass(MyCustomModel, { asArray: true });
		this.assert.equal(typeof compiledFunctionAsArray, 'function');
	}

	@Test()
	public async createValidatorFromFile() {
		const validateJsonFile = await this.objectValidator.createValidatorFromFile(this.jsonFileSchemaPath);
		this.assert.equal(typeof validateJsonFile, 'function');
		const result = validateJsonFile(this.jsonFileDataOk);
		const resultError = validateJsonFile(this.jsonFileDataError);
		this.assert.ok(result.valid);
		this.assert.deepEqual(result.errors, []);
		this.assert.equal(resultError.valid, false);
		this.assert.equal(resultError.errors.length, 2);
	}

	@Test()
	public async createValidatorFromClass() {
		const validatecustomClass = this.objectValidator.createValidatorFromClass(MyCustomModel);
		this.assert.equal(typeof validatecustomClass, 'function');
		const result = validatecustomClass(this.customClassDataOk);
		const resultError = validatecustomClass(this.customClassDataError);
		console.log(JSON.stringify(resultError.errors));
		this.assert.ok(result.valid);
		this.assert.deepEqual(result.errors, []);
		this.assert.equal(resultError.valid, false);
		this.assert.equal(resultError.errors.length, 3);
	}

	@Test()
	public async createValidatorFromClassAssArray() {

		const validatecustomClassArray = this.objectValidator.createValidatorFromClassAsArray(MyCustomModel);
		this.assert.equal(typeof validatecustomClassArray, 'function');
		const resultOnlyObjectOk = validatecustomClassArray(<any>this.customClassDataOk);
		const resultOnlyObjectError = validatecustomClassArray(<any>this.customClassDataError);
		const resultArrayOkError = validatecustomClassArray([this.customClassDataOk, this.customClassDataError]);
		const resultArrayError = validatecustomClassArray([this.customClassDataError, this.customClassDataError]);
		const resultArrayOk = validatecustomClassArray([this.customClassDataOk, this.customClassDataOk]);
		this.assert.ok(resultArrayOk.valid);
		this.assert.deepEqual(resultArrayOk.errors, []);
		this.assert.equal(resultOnlyObjectOk.valid, false);
		this.assert.equal(resultOnlyObjectOk.errors.length, 1);
		this.assert.equal(resultOnlyObjectError.valid, false);
		this.assert.equal(resultOnlyObjectError.errors.length, 1);
		this.assert.equal(resultArrayOkError.valid, false);
		this.assert.equal(resultArrayOkError.errors.length, 3);
		this.assert.equal(resultArrayError.valid, false);
		this.assert.equal(resultArrayError.errors.length, 6);
	}

}

