/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Service } from '../dependecy-injection/di.decorators';
import { IConfiguration } from './configuration.interfaces';
import { ObjectUtils } from '../utils/object.utils';

@Service()
export class ProjectConfiguration<T = undefined> implements IConfiguration {

	public init: IConfiguration['init'];
	public log: IConfiguration['log'];

	private frozenConfiguration: IConfiguration;

	constructor(
		originalConfiguration: IConfiguration
	) {
		this.frozenConfiguration = ObjectUtils.deepFreeze(
			ObjectUtils.deepClone(originalConfiguration || {})
		);
		this.init = this.frozenConfiguration.init;
		this.log = this.frozenConfiguration.log;
		// return new Proxy(this, <any>this);
	}

	public getProp<T>(path: string, defaultValue?: T): T {
		const props = `${path}`.split('.');
		let currVal: any | undefined = this.frozenConfiguration;
		for (const currProp of props) {
			currVal = currVal[currProp];
			if (currVal === undefined || currVal === null) {
				return <any>defaultValue;
			}
		}
		if ((currVal === undefined || currVal === null) && defaultValue) {
			return defaultValue;
		}
		return currVal;
	}
	/*
	get(target: any, prop: string) {
		if (target[prop]) {
			return prop[target];
		} else {
			return (<any>target.frozenConfiguration)[prop];
		}
	} */

}
