import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';
import {
	EObjectValidatorPropertyTypes, IPropertyValidatorMetadata, TObjectValidatorProeprtyOptions,
	IStringSchemaValidator, INumberSchemaValidator, IArraySchemaValidator
} from './object-validator.shared';

//
// Utils
//

export class ObjectValidatorDecoratorUtils {

	public static readonly propertyMetadataPrefix = 'p-object-validator-prop:';

	/**
	 * Adds metadata to the target class about it's hoow to validate this field
	 * @param inp 
	 */
	public static addProperty(inp: {
		target: any;
		propertyKey: string;
		type: EObjectValidatorPropertyTypes;
		options?: TObjectValidatorProeprtyOptions;
	}) {
		const metadataValue: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions> = {
			type: inp.type,
			property: inp.propertyKey,
			options: inp.options
		};
		Reflect.defineMetadata(`${this.propertyMetadataPrefix}${inp.type}:${inp.propertyKey}`, metadataValue, inp.target);
	}

	/**
	 * Retrieves all the metadata added by the validator decorator to the target classes
	 * @param clazz 
	 */
	public static getClassProperties<T>(clazz: ClassParameter<T>): IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[] {
		const keys = Reflect.getMetadataKeys(clazz.prototype);
		return keys
			.filter(metadataKey => TypeChecker.isString(metadataKey) && metadataKey.startsWith(this.propertyMetadataPrefix))
			.map(metadataKey => Reflect.getMetadata(metadataKey, clazz.prototype));
	}

	public static getSortedClassProperties<T>(clazz: ClassParameter<T>): {
		strings: IPropertyValidatorMetadata<IStringSchemaValidator>[];
		numbers: IPropertyValidatorMetadata<INumberSchemaValidator>[];
		arrays: IPropertyValidatorMetadata<IArraySchemaValidator>[];
		objects: IPropertyValidatorMetadata<ClassParameter<T>>[];
		requireds: IPropertyValidatorMetadata<undefined>[];
	} {
		
		const strings: IPropertyValidatorMetadata<IStringSchemaValidator>[] = [];
		const numbers: IPropertyValidatorMetadata<INumberSchemaValidator>[] = [];
		const arrays: IPropertyValidatorMetadata<IArraySchemaValidator>[] = [];
		const objects: IPropertyValidatorMetadata<ClassParameter<T>>[] = [];
		const requireds: IPropertyValidatorMetadata<undefined>[] = [];

		const classProperties = this.getClassProperties(clazz);

		for (const classProperty of classProperties) {
			if (PropertyValidatorTypeChecker.isString(classProperty)) {
				strings.push(classProperty);
			}
			if (PropertyValidatorTypeChecker.isNumber(classProperty)) {
				numbers.push(classProperty);
			}
			if (PropertyValidatorTypeChecker.isArray(classProperty)) {
				arrays.push(classProperty);
			}
			if (PropertyValidatorTypeChecker.isObject(classProperty)) {
				objects.push(classProperty);
			}
			if (PropertyValidatorTypeChecker.isRequired(classProperty)) {
				requireds.push(classProperty);
			}
		}

		return { strings, numbers, arrays, objects, requireds };
	}

}


export class ObjectValidatorUtils {

	/**
	 * Generates a valid [Json schema](https://json-schema.org/) from a decorated class
	 * with any of the validator decorators like `@ValidString()`, `@ValidNumber()`, 
	 * `@ValidArray()`, `@ValidObject()` or `@RequiredProperty()`
	 * @param clazz 
	 */
	public static generateJsonSchema<T>(clazz: ClassParameter<T>): Record<string, any> {
		const clazzValidatorProperties = ObjectValidatorDecoratorUtils.getSortedClassProperties(clazz);
		return {};
	}

}

//
// Type Checker
//

class PropertyValidatorTypeChecker {

	public static isString(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<IStringSchemaValidator> {
		return inp.type === EObjectValidatorPropertyTypes.string;
	}

	public static isNumber(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<INumberSchemaValidator> {
		return inp.type === EObjectValidatorPropertyTypes.number;
	}

	public static isArray(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<IArraySchemaValidator> {
		return inp.type === EObjectValidatorPropertyTypes.array;
	}

	public static isObject(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<ClassParameter<any>> {
		return inp.type === EObjectValidatorPropertyTypes.object;
	}

	public static isRequired(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<undefined> {
		return inp.type === EObjectValidatorPropertyTypes.required;
	}

}