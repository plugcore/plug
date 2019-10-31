/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'reflect-metadata';
import { RmdConstats } from '../constants/reflect-metadata.constants';
import { ExtCtxGenerator } from '../extensions/ext-ctx.generator';
import { JsStackUtils } from '../utils/js-stack.utils';
import { Container } from './di.container';
import { IServiceArgs, IInjectArgs } from './di.interfaces';

/**
 * Service decortor made to easily registrer the class into the container
 * @param sId
 */
export function Service({ ctx, sId }: IServiceArgs = {}): Function {

	return (target: Function) => {

		// If arguments size is 1 it means its a class definition
		if (typeof target === 'function') {

			const constructorParms = Reflect.getMetadata(RmdConstats.constructorParams, target);
			ctx = ctx || ExtCtxGenerator.generateCtx(JsStackUtils.getLastCallFromStack(3));

			// We can register the service either by its Class or by a custom name
			sId = sId ? sId : target;
			Container.registrerService(sId, target, constructorParms, ctx);

			// Mark class as service so we know we must track it
			(<any>target)['isService'] = true;

		}

	};

}

/**
 * Injects the dependency into the property. It can be placed in a property
 * definition at class level or at constructor level
 * @param sId
 */
export function Inject({ sId, ctx, variation, variationVarName }: IInjectArgs = {}): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {

		const type = Reflect.getMetadata(RmdConstats.objectClass, target, propertyName);

		if (!sId) { sId = type; }
		if (!sId && index !== undefined) {
			const constructorParms = <Function[]>Reflect.getMetadata(RmdConstats.constructorParams, target);
			sId = constructorParms[index];
		}

		if (sId) {

			if (target instanceof Function && index !== undefined) {
				// Constructor inject
				Container.registrerConstructorHandler({
					id: target.name,
					targetId: sId,
					index: index,
					targetCtx: ctx,
					update: true,
					variation,
					variationVarName
				});

			} else if (target instanceof Object) {
				// Property inject

				Container.registerDepLeft({
					serviceId: target.constructor.name,
					targetServiceId: sId,
					targetCtx: ctx,
					update: true,
					variation,
					variationVarName
				});
				Container.get(sId, ctx, variation).then(dep => {
					Object.defineProperty(target, propertyName, {
						enumerable: true,
						writable: true,
						configurable: true,
						value: dep
					});

				});

			}
		}

	};

}
