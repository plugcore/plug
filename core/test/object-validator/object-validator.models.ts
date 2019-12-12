import { IsNumber, IsString, Required, IsBoolean, IsArray, IsObject } from '../../src/object-validator/object-validator.decorators';

export class ObjectValidatorDecoratorsTestSubClass {

	@IsNumber()
	public numberSubProp: number;

	@IsString()
	public stringSubProp: string;

	@Required()
	@IsBoolean()
	public boolSubProp: boolean;

}

export class ObjectValidatorDecoratorsTestClass {

	@Required()
	@IsNumber({
		minimum: 2
	})
	public numberProp: number;

	@IsString({
		pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$'
	})
	public stringProp: string;

	@IsArray({
		items: [String, Number, Boolean]
	})
	public arrayProp: (string | number | boolean)[];

	@IsArray({
		items: ObjectValidatorDecoratorsTestSubClass
	})
	@Required()
	public objectsArrayProp: ObjectValidatorDecoratorsTestSubClass[];

	@Required()
	@IsObject(ObjectValidatorDecoratorsTestSubClass)
	public subPropr: ObjectValidatorDecoratorsTestSubClass;

}
