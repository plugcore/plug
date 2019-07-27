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
	items?: Record<string, any> | Record<string, any>[];
	additionalItems?: Record<string, any> | boolean;
	contains?: Record<string, any>;
}

export interface IValidationResult {
	valid: boolean;
	errors: Ajv.ErrorObject[];
}

export interface IPropertyValidatorMetadata<T extends TObjectValidatorProeprtyOptions> {
	property: string;
	type: EObjectValidatorPropertyTypes;
	options?: T;
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
	required = 'required'
}

//
// Types
//

export type TObjectValidatorProeprtyOptions = INumberSchemaValidator | IStringSchemaValidator | IArraySchemaValidator | ClassParameter<any> | undefined;