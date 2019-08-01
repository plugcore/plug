import { ClassParameter } from '../utils/typescript.utils';
import {
	EObjectValidatorPropertyTypes, IArraySchemaValidator, INumberSchemaValidator, IStringSchemaValidator
} from './object-validator.shared';
import { ObjectValidatorDecoratorUtils } from './object-validator.utils';

//
// Decorators
//

export function IsString(options?: IStringSchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.string
		});
	};
}

export function IsNumber(options?: INumberSchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.number
		});
	};
}

export function IsBoolean() {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, type: EObjectValidatorPropertyTypes.boolean
		});
	};
}


export function IsArray(options?: IArraySchemaValidator) {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, options, type: EObjectValidatorPropertyTypes.array
		});
	};
}

export function IsObject<T>(clazz: ClassParameter<T>) {
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
