import { IsNumber, IsString, Required, IsBoolean, IsArray, IsObject, ExtendsSchema } from '../../src/object-validator/object-validator.decorators';

export class MyCustomSubModel {

	@IsNumber()
	public numberSubProp: number;

	@IsString()
	public stringSubProp: string;

	@Required()
	@IsBoolean()
	public boolSubProp: boolean;

}

export class MyCustomModel {

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
		items: MyCustomSubModel
	})
	@Required()
	public objectsArrayProp: MyCustomSubModel[];

	@Required()
	@IsObject(MyCustomSubModel)
	public subPropr: MyCustomSubModel;

}

@ExtendsSchema(MyCustomModel, { ignoreProperties: ['objectsArrayProp', 'subPropr'] })
@ExtendsSchema(MyCustomSubModel)
export class ModelWithExtendedSchemas {
	@Required()
	@IsNumber()
	public otherNumberProp: number;
}

@ExtendsSchema(MyCustomModel, { includeProperties: ['numberProp', 'stringProp', 'arrayProp'] })
@ExtendsSchema(MyCustomSubModel)
export class ModelWithExtendedSchemas2 {
	@Required()
	@IsNumber()
	public otherNumberProp: number;
}
