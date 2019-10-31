/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Service } from '../dependecy-injection/di.decorators';
import { IServiceArgs, IServiceIdentifier } from '../dependecy-injection/di.interfaces';
import { DiService } from '../dependecy-injection/di.service';
import { ExtCtxGenerator } from '../extensions/ext-ctx.generator';
import { JsStackUtils } from '../utils/js-stack.utils';
import { CronUtils } from './scheduler';

export function Scheduler({ sId, ctx }: IServiceArgs = {}) {

	return (target: Function) => {

		// If arguments size is 1 it means its a class definition
		if (arguments.length === 1) {

			// Setting ctx

			ctx = ctx || ExtCtxGenerator.generateCtx(JsStackUtils.getLastCallFromStack(3));

			// Di registration

			const serviceFunc = Service({ sId, ctx });
			serviceFunc(target);

			// Register all new api entries

			const serviceId = DiService.genServiceId(sId || target);
			runScheduledJobs(serviceId, ctx);
		}
	};
}

interface IMetadata {
	cronExpression: string;
	funcName: any;
	clazz: any;
}

/**
 *
 * @param cronExp
 */
export function ScheduledJob(cronExp: string) {

	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		registerJob(target, propertyKey, descriptor, cronExp);
	};
}

function registerJob(target: any, propertyKey: string, descriptor: PropertyDescriptor, cronExpression: string) {

	if (target instanceof Object) {

		const serviceId = target.constructor.name;
		const newMeta = <IMetadata>{
			cronExpression,
			funcName: propertyKey,
			clazz: target
		};

		let metadataArr = DiService.getTmpMetadata(serviceId);

		if (metadataArr) {
			metadataArr.push(newMeta);
		} else {
			metadataArr = [newMeta];
		}
		DiService.updateTmpMetadata(serviceId, metadataArr);
	}
}

async function runScheduledJobs(serviceId: IServiceIdentifier, ctx?: string) {

	const metadata = DiService.getMetadata(serviceId, ctx);

	if (metadata && metadata instanceof Array) {
		metadata.forEach(async (element: IMetadata) => {

			/* const idJob = `${element.clazz.constructor.name}.${element.funcName}`;

			const registeredJob: any = {
				idJob,
				defaultCron: element.cronExpression
			}; */

			// TODO persist another way
			// await contentService.create(registeredJob, 'Jander', '0000000cb430c320689f0897', RegisteredJob, idJob);

			const funct = element.clazz[element.funcName];
			CronUtils.createCronJob(element.cronExpression, funct, element.clazz.constructor.name);
		});
	}
}
