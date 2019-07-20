import { ClassParameter } from '../utils/typescript.utils';
import {
	EObjectValidatorPropertyTypes, IArraySchemaValidator, INumberSchemaValidator, IStringSchemaValidator
} from './object-validator.shared';
import { ObjectValidatorDecoratorUtils } from './object-validator.utils';

//
// Decorators
//

export function ValidString(options?: IStringSchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.string
		});
	};
}

export function ValidNumber(options?: INumberSchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.number
		});
	};
}

export function ValidBoolean() {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, type: EObjectValidatorPropertyTypes.boolean
		});
	};
}


export function ValidArray(options?: IArraySchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.array
		});
	};
}

export function ValidObject<T>(clazz: ClassParameter<T>) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options: clazz, type: EObjectValidatorPropertyTypes.object
		});
	};
}

export function RequiredProperty() {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, type: EObjectValidatorPropertyTypes.required
		});
	};
}
