import { ClassParameter } from '../utils/typescript.utils';
import {
	EObjectValidatorPropertyTypes, IArraySchemaValidator, INumberSchemaValidator, IStringSchemaValidator, IExendsSchemaConfig
} from './object-validator.shared';
import { ObjectValidatorDecoratorUtils } from './object-validator.utils';
import { TypeChecker } from '../utils/type.checker';

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

export function Required() {
	return (target: any, propertyKey: string) => {
		ObjectValidatorDecoratorUtils.addProperty({
			target, propertyKey, type: EObjectValidatorPropertyTypes.required
		});
	};
}

export function ExtendsSchema<T>(targetSchema: ClassParameter<T>, config?: IExendsSchemaConfig<T>) {
	return (target: any) => {
		if (TypeChecker.isClass(target)) {
			ObjectValidatorDecoratorUtils.addExtendsSchema({
				clazz: target, config: {
					...{ schema: targetSchema },
					...(config || {})
				}
			});
		}
	};
}
