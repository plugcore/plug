import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';
import {
	EObjectValidatorPropertyTypes, IPropertyValidatorMetadata, TObjectValidatorProeprtyOptions,
	IStringSchemaValidator, INumberSchemaValidator, IArraySchemaValidator, IExendsSchema
} from './object-validator.shared';
import { StringUtils } from '../utils/string.utils';

//
// Utils
//

export class ObjectValidatorDecoratorUtils {

	public static readonly propertyMetadataPrefix = 'p-object-validator-prop:';
	public static readonly propertyExtendsSchemaPrefix = 'p-object-validator-extends-schema:';

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
	 * Adds metadata to the target class about a schema that extends
	 * @param inp
	 */
	public static addExtendsSchema(inp: {
		clazz: ClassParameter<any>;
		config: IExendsSchema<any>;
	}) {
		const targetName = inp.config.schema.name;
		Reflect.defineMetadata(`${this.propertyExtendsSchemaPrefix}${targetName}`, inp.config, inp.clazz.prototype);
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

	/**
	 * Returns a list of IExendsSchemaConfig of all the extended schemas
	 * for this class
	 * @param clazz
	 */
	public static getExtendedSchemas<T>(clazz: ClassParameter<T>): IExendsSchema<any>[] {
		const keys = Reflect.getMetadataKeys(clazz.prototype);
		return keys
			.filter(metadataKey => TypeChecker.isString(metadataKey) && metadataKey.startsWith(this.propertyExtendsSchemaPrefix))
			.map(metadataKey => Reflect.getMetadata(metadataKey, clazz.prototype));
	}

	public static sortClassProperties<T>(clazz: ClassParameter<T>): {
		objectProperties: Record<string, IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[]>;
		requiredProperties: IPropertyValidatorMetadata<undefined>[];
	} {

		const extendedSchemas = this.getExtendedSchemas(clazz);
		let classProperties: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[] = [];
		for (const extendedSchema of extendedSchemas) {
			const targetClassProperties = this.getClassProperties(extendedSchema.schema);
			classProperties = classProperties.concat(
				targetClassProperties.filter(p => (
					extendedSchema.includeProperties ?
						extendedSchema.includeProperties.includes(p.property) :
						(
							!extendedSchema.ignoreProperties ||
							!extendedSchema.ignoreProperties.includes(p.property)
						)
				))
			);
		}
		classProperties = classProperties.concat(this.getClassProperties(clazz));
		const requiredProperties = classProperties.filter(PropertyValidatorTypeChecker.isRequired);
		const objectProperties = classProperties
			.filter(rp => !PropertyValidatorTypeChecker.isRequired(rp))
			.reduce((prev, curr) => {
				prev[curr.property] = (prev[curr.property] || []).concat(curr);
				return prev;
			}, <Record<string, IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[]>>{});

		return { requiredProperties, objectProperties };
	}

}


export class ObjectValidatorUtils {

	private static readonly schemaVersion = 'http://json-schema.org/draft-07/schema#';

	/**
	 * Generates a valid [Json schema](https://json-schema.org/) from a decorated class
	 * with any of the validator decorators like `@IsString()`, `@IsNumber()`,
	 * `@IsArray()`, `@IsObject()` or `@RequiredProperty()`
	 * @param clazz
	 */
	public static generateJsonSchema<T>(clazz: ClassParameter<T>, options?: {
		asArray?: boolean;
		ignoreSchemaVersion?: boolean;
	}): Record<string, any> {
		const sortedClassProperties = ObjectValidatorDecoratorUtils.sortClassProperties(clazz);

		const asArray = options && options.asArray;
		const schema: Record<string, any> = {
			$schema: options && options.ignoreSchemaVersion ? undefined : this.schemaVersion,
			title: asArray ? StringUtils.capitalize(clazz.name) + ' list' : clazz.name,
			type: asArray ? 'array' : 'object',
		};

		const resultSchema = asArray ? {
			title: clazz.name,
			type: 'object',
		} : schema;

		// Field types

		// TODO: Improve readibility, remove depth
		const objectProperties = sortedClassProperties.objectProperties;
		if (Object.keys(objectProperties).length > 0) {

			const properties: Record<string, any> = {};

			for (const objKey of Object.keys(objectProperties)) {

				const validatorTypes = objectProperties[objKey];
				const objectProperty = validatorTypes.find(vt => vt.type === EObjectValidatorPropertyTypes.object);

				if (objectProperty && PropertyValidatorTypeChecker.isObject(objectProperty)) {
					// Property is sub object
					properties[objectProperty.property] = this.generateJsonSchema(
						objectProperty.options, { ignoreSchemaVersion: true} );

				} else {
					// Property is primitive type or Array
					const property: Record<string, any> = {
						title: StringUtils.capitalize(objKey),
						type: (validatorTypes.length === 1) ?
							validatorTypes[0].type : validatorTypes.map(vt => vt.type)
					};

					this.changeArrayClassTypesToJsonSchema(validatorTypes);
					const propertiesToAdd = validatorTypes
						.filter(vt => vt.options !== undefined)
						.map(vt => vt.options)
						.reduce((prev, curr) => Object.assign(prev, curr), <object>{});
					if (Object.keys(propertiesToAdd).length > 0) {

						Object.assign(property, propertiesToAdd);
					}

					properties[objKey] = property;

				}

			}

			if (Object.keys(properties).length > 0) {
				resultSchema.properties = properties;
			}

		}

		// Required fields

		if (sortedClassProperties.requiredProperties.length > 0) {
			resultSchema.required = sortedClassProperties.requiredProperties.map(rp => rp.property);
		}

		if (asArray) {
			schema.items = resultSchema;
		}

		return asArray ? schema : resultSchema;
	}

	//
	// Private methods
	//

	/**
	 * All array decorators that are using clases in the items property instead
	 * of a JSON schema object, have to be changed, ex:
	 * @IsArray({
	 *	 items: [String, Number, Boolean],
	 *   additionalItems: false
	 * })
	 * Has to be {
	 *	 items: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
	 *   additionalItems: false
	 * }
	 */
	private static changeArrayClassTypesToJsonSchema(
		validatorTypes?: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>[]
	) {
		if (!validatorTypes) {
			return;
		}
		for (const aType of validatorTypes.filter(PropertyValidatorTypeChecker.isArray)) {
			if (aType.options && aType.options.items) {

				const items: (Record<string, any> | ClassParameter<any>)[] =
					TypeChecker.isArray(aType.options.items) ? aType.options.items : [aType.options.items];

				const newItems: Record<string, any>[] = [];
				for (const item of items) {

					if (TypeChecker.typeIsBoolean(item)) {
						newItems.push({
							type: 'boolean'
						});
					} else if (TypeChecker.typeIsNumber(item)) {
						newItems.push({
							type: 'number'
						});
					} else if (TypeChecker.typeIsString(item)) {
						newItems.push({
							type: 'string'
						});
					} else if (TypeChecker.isClass(item)) {
						newItems.push(this.generateJsonSchema(
							item, { ignoreSchemaVersion: true} )
						);
					} else {
						newItems.push(item);
					}

				}

				aType.options.items = TypeChecker.isArray(aType.options.items) ? newItems : newItems[0];

			}
		}
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
	): inp is Required<IPropertyValidatorMetadata<ClassParameter<any>>> {
		const hasName = inp.options && (<ClassParameter<any>>inp.options).name !== undefined || false;
		return inp.type === EObjectValidatorPropertyTypes.object && hasName;
	}

	public static isRequired(
		inp: IPropertyValidatorMetadata<TObjectValidatorProeprtyOptions>
	): inp is IPropertyValidatorMetadata<undefined> {
		return inp.type === EObjectValidatorPropertyTypes.required;
	}

}
