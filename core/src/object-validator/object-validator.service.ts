import { Service } from '../dependecy-injection/di.decorators';
import Ajv from 'ajv';
import * as AjvTypes from 'ajv';
import { FsUtils } from '../io/fs.utils';
import { TypeChecker } from '../utils/type.checker';
import { ValidationResult, CompiledValidation, ObjectValidatorFunction } from './object-validator.shared';
import { ClassParameter } from '../utils/typescript.utils';
import { ObjectValidatorUtils } from './object-validator.utils';
import addFormats from 'ajv-formats';

@Service()
export class ObjectValidator {

	private readonly ajv;

	constructor() {
		this.ajv = new Ajv({
			allErrors: true,
			strictTuples: false
		});
		addFormats(this.ajv);
	}

	/**
	 * Executes a validation from a compiled JSON schema validation or form a JSON schema object
	 * to the given object, and returns a `ValidationResult` wich has a property 'valid: boolean'
	 * and a list of possible errors. It DOES not execute async validations
	 * @param schemaOrValidateFunction
	 * @param objToValidate
	 */
	public validate<T = any>(schemaOrValidateFunction: Record<string, any> | AjvTypes.ValidateFunction, objToValidate: T): ValidationResult  {
		const func = TypeChecker.isObject(schemaOrValidateFunction) ? this.compile(schemaOrValidateFunction) : schemaOrValidateFunction;
		const result = func(objToValidate);
		if (TypeChecker.isPromise(result)) {
			throw new Error('Invalid object validation, async detected');
		}
		const errors = func.errors;
		if (errors === null || errors === undefined || errors.length === 0){
			return { valid: true, errors: [] };
		} else {
			return { valid: false, errors };
		}
	}

	/**
	 * Same than `validate`, but can perform an async validation
	 * @param schemaOrValidateFunction
	 * @param objToValidate
	 */
	public async asyncValidate<T>(schemaOrValidateFunction: Record<string, any> | AjvTypes.ValidateFunction, objToValidate: T): Promise<ValidationResult>  {
		const func = TypeChecker.isObject(schemaOrValidateFunction) ? this.compile(schemaOrValidateFunction) : schemaOrValidateFunction;
		const result = func(objToValidate);
		if (TypeChecker.isPromise(result)) {
			await result;
		}
		const errors = func.errors;
		if (errors === null || errors === undefined || errors.length === 0){
			return { valid: true, errors: [] };
		} else {
			return { valid: false, errors };
		}
	}

	/**
	 * Given a valid JSON Schema object, it creates a function that is a compiled version of the
	 * schema in order to improve performance
	 * @param schema
	 */
	public compile(schema: Record<string, any>): CompiledValidation {
		return this.ajv.compile(schema);
	}

	/**
	 * Same than `compile` but can execute async functionality
	 * @param schema
	 */
	public async asyncCompile(schema: Record<string, any>): Promise<CompiledValidation> {
		return this.ajv.compile(schema);
	}

	/**
	 * Given a file path that poiints to a JSON Object, it loads and compiles it.
	 * @param jsonFile
	 */
	public async compileFromFile(jsonFile: string) {
		const fileContent = await FsUtils.loadJsonFile<Record<string, any>>(jsonFile);
		return await this.asyncCompile(fileContent);
	}

	/**
	 * If you have a model class decorated with this module decorators such as
	 * `@IsNumber()`, `@IsString()`, etc. Generates a valid JSON Schema object and compiles it
	 * @param clazz
	 */
	public compileFromClass(clazz: ClassParameter<any>, options?: {
		asArray?: boolean;
		ignoreSchemaVersion?: boolean;
	}) {
		const schema = ObjectValidatorUtils.generateJsonSchema(clazz, options);
		return this.compile(schema);
	}

	/**
	 * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
	 * version of JSON Schema file. This way you can store the funcion and call it
	 * just with the value that you want to vaidate
	 * @param jsonFile
	 */
	public async createValidatorFromFile<T>(jsonFile: string): Promise<ObjectValidatorFunction<T>> {
		const compiledSchema = await this.compileFromFile(jsonFile);
		return (objToValidate: T) => this.validate<T>(compiledSchema, objToValidate);
	}

	/**
	 * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
	 * version of the model class. This way you can store the funcion and call it
	 * just with the value that you want to vaidate
	 * @param clazz
	 */
	public createValidatorFromClass<T>(clazz: ClassParameter<T>): ObjectValidatorFunction<T> {
		const compiledSchema = this.compileFromClass(clazz);
		return (objToValidate: T) => this.validate<T>(compiledSchema, objToValidate);
	}

	/**
	 * This will retrun a funcion typed `ValidationFunction<T>` with an already compiled
	 * version of the model class. This way you can store the funcion and call it
	 * just with the value that you want to vaidate
	 * @param clazz
	 */
	public createValidatorFromClassAsArray<T>(clazz: ClassParameter<T>): ObjectValidatorFunction<T[]> {
		const compiledSchema = this.compileFromClass(clazz, { asArray: true });
		return (objToValidate: T[]) => this.validate<T[]>(compiledSchema, objToValidate);
	}

}
