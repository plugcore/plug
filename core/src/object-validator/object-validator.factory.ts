/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Service } from '../dependecy-injection/di.decorators';
import * as Ajv from 'ajv';
import { FsUtils } from '../io/fs.utils';
import { TypeChecker } from '../utils/type.checker';
import { IValidationResult } from './object-validator.shared';

@Service()
export class ObjectValidatorFactory {

	private readonly ajv = new Ajv({ allErrors: true });

	public validate(schemaOrValidateFunction: object | Ajv.ValidateFunction, objToValidate: object): IValidationResult  {
		const func = TypeChecker.isObject(schemaOrValidateFunction) ? this.compile(schemaOrValidateFunction) : schemaOrValidateFunction;
		const result = func(objToValidate);
		if (TypeChecker.isPromise(result)) {
			throw new Error('Invalid object validation, async detected');
		}
		const errors = func.errors;
		if (errors === null || errors === undefined || errors.length === 0){
			return { valid: true, errors: [] };
		} else {
			return { valid: false, errors };
		}
	}

	public compile(schema: object) {
		return this.ajv.compile(schema);
	}

	public async compileFromFile(jsonFile: string) {
		const fileContent = await FsUtils.loadJsonFile<object>(jsonFile);
		return await this.compile(fileContent);
	}

}
