import { PlugTest } from '../../src/test/test.shared';
import { TestClass, Test } from '../../src/test/test.decorators';
import {
	ValidNumber, RequiredProperty, ValidArray, ValidObject, ValidString
} from '../../src/object-validator/object-validator.decorators';
import { ObjectValidatorDecoratorUtils } from '../../src/object-validator/object-validator.utils';

@TestClass({ testThisOnly: true })
export class ObjectValidatorDecorators extends PlugTest {

	@Test()
	public async testClass() {

		const props = ObjectValidatorDecoratorUtils.getClassProperties(ObjectValidatorDecoratorsTestClass);
		console.log({props});

	}

}

class ObjectValidatorDecoratorsTestSubClass {

	@ValidNumber({})
	public numberProp: number;

	@ValidString({})
	public stringProp: string;

}

class ObjectValidatorDecoratorsTestClass {

	@RequiredProperty()
	@ValidNumber({})
	public numberProp: number;

	@RequiredProperty()
	@ValidString({})
	public stringProp: string;

	@ValidArray({})
	public arrayProp: string[];

	@ValidObject(ObjectValidatorDecoratorsTestSubClass)
	public subPropr: ObjectValidatorDecoratorsTestSubClass;

}
