import 'reflect-metadata';
import { RmdConstats } from '../constants/reflect-metadata.constants';
import { TypeChecker } from '../utils/type.checker';
import { ClassParameter } from '../utils/typescript.utils';
import { Container } from './di.container';
import { IInjectArgs, IServiceArgs, IServiceIdentifier } from './di.interfaces';

/**
 * Service decorator made to easily registrer the class into the container
 * @param sId
 */
export function Service({ ctx, sId, connection }: IServiceArgs = {}): Function {

	return (target: Function) => {

		// If arguments size is 1 it means its a class definition
		if (TypeChecker.isClass(target)) {

			const constructorParms = Reflect.getMetadata(RmdConstats.constructorParams, target);
			// Waiting for extension funcionality
			/* ctx = ctx || ExtCtxGenerator.generateCtx(JsStackUtils.getLastCallFromStack(3)); */

			// We can register the service either by its Class or by a custom name
			sId = sId ? sId : target;
			Container.registrerService({ id: sId, clazz: target, params: constructorParms, ctx, connection });

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
export function Inject(inp?: IServiceIdentifier<any> | IInjectArgs): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {

		const type = Reflect.getMetadata(RmdConstats.objectClass, target, propertyName);

		let sId: IServiceIdentifier<any> | undefined;
		let ctx: string | undefined;
		let variationVarName: string | undefined;
		let variation: Record<string, any> | undefined;

		if (inp && isInjectArgs(inp)) {
			sId = inp.sId;
			ctx = inp.ctx;
			variationVarName = inp.variationVarName;
			variation = inp.variation;
		} else if (inp) {
			sId = inp;
		}

		if (!sId) { sId = type; }
		if (!sId && index !== undefined) {
			const constructorParms = <ClassParameter<any>[]>Reflect.getMetadata(RmdConstats.constructorParams, target);
			sId = constructorParms[index];
		}

		if (sId) {

			if (TypeChecker.typeIsPrimitive(sId)) {
				sId = propertyName;
			}
			if (variationVarName === Container.connection) {
				sId = Container.connection;
			}

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

			} else if (target instanceof Object && TypeChecker.isClass(target.constructor)) {


				// Property inject
				Container.registerDepLeft({
					serviceId: target.constructor.name,
					targetServiceId: sId,
					targetCtx: ctx,
					update: true,
					variation,
					variationVarName
				});

				Container.getServiceProperty({
					originalService: {
						id: target.constructor.name,
						clazz: target.constructor
					},
					targetService: {
						id: sId, variation, ctx
					}
				}).then(dep => {
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

/**
 * Injects the dependency into the property. It can be placed in a property
 * definition at class level or at constructor level
 * @param sId
 */
export function InjectConnection(): Function {
	return (target: Record<string, any> | Function, propertyName: string, index?: number) => {
		Inject({ variationVarName: Container.connection })(target, propertyName, index);
	};
}

function isInjectArgs(arg: IServiceIdentifier<any> | IInjectArgs): arg is IInjectArgs {
	return arg && ((<any>arg).sId || (<any>arg).ctx || (<any>arg).connection || (<any>arg).variationVarName || (<any>arg).variation);
}
