import * as Ajv from 'ajv';
import { ClassParameter } from '../utils/typescript.utils';

//
// Interfaces
//

export interface INumberSchemaValidator {
	maximum?: number;
	minimum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
}

export interface IStringSchemaValidator {
	maxLength?: number;
	minLength?: number;
	pattern?: string;
	format?: 'date' | 'date-time' | 'uri' | 'email' | 'hostname' | 'ipv4' | 'ipv6' | 'regex';
	formatMaximum?: string;
	formatMinimum?: string;
	formatExclusiveMaximum?: string;
	formatExclusiveMinimum?: string;
}

export interface IArraySchemaValidator {
	maxItems?: number;
	minItems?: number;
	uniqueItems?: boolean;
	items?: Record<string, any> | Record<string, any>[] | ClassParameter<any> | ClassParameter<any>[];
	additionalItems?: Record<string, any> | boolean;
}

export interface ValidationResult {
	valid: boolean;
	errors: Ajv.ErrorObject[];
}

export interface IPropertyValidatorMetadata<T extends TObjectValidatorProeprtyOptions> {
	property: string;
	type: EObjectValidatorPropertyTypes;
	options?: T;
}

export interface IExendsSchema<T> extends IExendsSchemaConfig<T> {
	schema: ClassParameter<T>;
}

export interface IExendsSchemaConfig<T> {
	ignoreProperties?: (keyof T)[];
	includeProperties?: (keyof T)[];
}

//
// Enums
//

export enum EObjectValidatorPropertyTypes {
	number = 'number',
	string = 'string',
	boolean = 'boolean',
	array = 'array',
	object = 'object',
	required = 'required',
	extendsSchema = 'extendsSchema'
}

//
// Types
//

export type TObjectValidatorProeprtyOptions = INumberSchemaValidator | IStringSchemaValidator | IArraySchemaValidator | ClassParameter<any> | undefined;

export type CompiledValidation = Ajv.ValidateFunction;

export type ObjectValidatorFunction<T> = (objToValidate: T) => ValidationResult;
