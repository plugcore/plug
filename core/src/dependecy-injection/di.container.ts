import { IDiEntry, IDiOnInit, IDiServiceMetadata, IServiceIdentifier } from './di.interfaces';
import { DiService } from './di.service';
import { EventUtils } from '../events/event.utils';
import { ObjectUtils } from '../utils/object.utils';

/**
 * Service container.
 */
export class Container {

	// -------------------------------------------------------------------------
	// Public constants
	// -------------------------------------------------------------------------

	public static readonly globalCtx = 'GLOBAL';
	public static readonly serviceMetadata = 'diServiceMetadata';

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	/**
	 * Registers the given Class as a new service and it will try to create a new instance
	 * and return it to any Container.get requesting this IServiceIdentifier as soon as
	 * all the dependecies are met
	 * @param id
	 * @param clazz
	 * @param params
	 * @param ctx
	 */
	public static registrerService(id: IServiceIdentifier, clazz: Function, params?: Function[], ctx?: string) {
		const serviceId = DiService.genServiceId(id);
		const entry = DiService.getTmpEnrySafely(serviceId, clazz);

		this.setServiceMetadata(clazz, id, ctx);
		DiService.discardTmpEntry(serviceId);
		entry.serviceId = DiService.genServiceId(id);

		if (params && params.length > 0) {
			this.initConstructorService(entry, params, ctx);
		} else {
			this.initService(entry, ctx);
		}

	}

	/**
	 * Sets the given service with its instance and marks it as ready, so
	 * other services can have it as dependency.
	 * @param serviceClass
	 * @param instance
	 * @param serviceId
	 * @param ctx
	 */
	public static set(serviceClass: Function, instance: Record<string, any>, id?: string, ctx?: string) {

		const serviceId = id || serviceClass;

		this.setServiceMetadata(serviceClass, serviceId, ctx);

		const entry: IDiEntry = DiService.createBasicEntry(
			DiService.genServiceId(serviceId), serviceClass);
		entry.object = instance;

		this.initService(entry, ctx);

	}

	/**
	 * Returns the requested service once all it's dependencies has been
	 * met. This method keep the current thread alive until it returns
	 * a value.
	 * @param serviceId
	 * @param ctx
	 */
	public static async get<T>(
		serviceId: IServiceIdentifier, ctx?: string, variation?: Record<string, any>
	): Promise<T> {

		const serviceName = DiService.genServiceId(serviceId, variation);
		const entry = DiService.getEntry(serviceName, ctx);

		if (entry && entry.isReady) {
			return entry.object;
		} else {
			return await this.waitForDep<T>(serviceName, ctx, variation);
		}

	}

	/**
	 * Internal usage only, it registers a Class property as dependency for the service
	 * @param serviceId
	 * @param targetServiceId
	 * @param ctx
	 * @param update
	 */
	public static registerDepLeft(inp: {
		serviceId: IServiceIdentifier;
		targetServiceId: IServiceIdentifier;
		targetCtx?: string;
		update?: boolean;
		variation?: Record<string, any>;
		variationVarName?: string;
	}) {

		const serviceName = DiService.genServiceId(inp.serviceId);
		const targetServiceName = DiService.genServiceId(inp.targetServiceId, inp.variation);
		let entry = DiService.getTmpEnrySafely(serviceName);

		entry = this.registerEntryDepLeft({
			entry,
			targetServiceName,
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName
		});

		if (inp.update) {
			DiService.updateTmpEnry(entry);
		}

	}

	/**
	 * Internal usage only, it register a class constructor property, it's the only way
	 * you can se parameters like serviceId or context
	 * @param id
	 * @param targetId
	 * @param index
	 * @param ctx
	 * @param update
	 */
	public static registrerConstructorHandler(inp: {
		id: IServiceIdentifier;
		targetId: IServiceIdentifier;
		index: number;
		targetCtx?: string;
		update?: boolean;
		variation?: Record<string, any>;
		variationVarName?: string;
	}) {

		const serviceName = DiService.genServiceId(inp.id);
		const targetServiceName = DiService.genServiceId(inp.targetId);

		let entry = DiService.getTmpEnrySafely(serviceName);
		entry = this.updateConstructorHandler({
			entry,
			index: inp.index,
			targetServiceName,
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName,
		});

		if (inp.update) {
			DiService.updateTmpEnry(entry);
		}

		if (inp.variation) {
			this.waitForDep(targetServiceName, inp.targetCtx, inp.variation);
		}

	}

	/**
	 * Returns a promise that gets executed once all the dependecies
	 * passed in the input array are met
	 * @param deps
	 */
	public static async waitFor(deps: IDiServiceMetadata[]): Promise<void> {

		if (deps && deps.length > 0) {

			const contDeps: Promise<any>[] = [];
			deps.forEach(dep => {
				contDeps.push(Container.get(dep.serviceId, dep.ctx));
			});

			await Promise.all(contDeps);

		} else {
			throw new Error('Container.waitFor => Deps argument not defined or empty');
		}
	}

	/**
	 * Returns the service metadata attached to the function if it exists
	 * (then it means this class is controlled by the container) or undefined
	 * if no metadata is found
	 * @param clazz
	 */
	public static getServiceMetadata(clazz: Function): IDiServiceMetadata | undefined {
		let result: IDiServiceMetadata | undefined;
		const metadata = (<any>clazz)[this.serviceMetadata];

		if (metadata) {
			result = <IDiServiceMetadata>metadata;
		}

		return result;
	}

	// -------------------------------------------------------------------------
	// Private methods
	// -------------------------------------------------------------------------

	private static registerEntryDepLeft(inp: {
		entry: IDiEntry;
		targetServiceName: string;
		targetCtx?: string;
		variationVarName?: string;
	}): IDiEntry {

		const newDepLeft = {
			targetServiceId: inp.targetServiceName,
			depMet: inp.variationVarName !== undefined || DiService.depIsReady(inp.targetServiceName, inp.targetCtx),
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName
		};

		if (inp.entry.depsLeft) {
			const hIndex = inp.entry.depsLeft
				.findIndex(el => el.targetServiceId === inp.targetServiceName);
			if (hIndex === -1) {
				inp.entry.depsLeft.push(newDepLeft);
			} else {
				inp.entry.depsLeft[hIndex] = newDepLeft;
			}
		} else {
			inp.entry.depsLeft = [newDepLeft];
		}

		return inp.entry;

	}

	private static updateConstructorHandler(inp: {
		entry: IDiEntry;
		index: number;
		targetServiceName: string;
		targetCtx?: string;
		variationVarName?: string;
	}): IDiEntry {
		const newHandler = {
			targetServiceId: inp.targetServiceName,
			index: inp.index,
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName
		};
		if (inp.entry.constructorHandlers) {
			const hIndex = inp.entry.constructorHandlers
				.findIndex(el => el.index === inp.index);
			if (hIndex === -1) {
				inp.entry.constructorHandlers.push(newHandler);
			}
		} else {
			inp.entry.constructorHandlers = [newHandler];
		}
		return inp.entry;
	}

	private static initConstructorService(entry: IDiEntry, params: Function[], ctx?: string) {

		params.forEach((targetClass, index) => {
			const targetServiceName = DiService.genServiceId(targetClass);
			// This will create a dep only if it's not been decorated iwth @inject() before
			entry = this.updateConstructorHandler({
				entry,
				index,
				targetServiceName,
				targetCtx: ctx
			});
		});

		if (entry.constructorHandlers) {
			entry.constructorHandlers.forEach(element => {
				entry = this.registerEntryDepLeft({
					entry,
					targetServiceName: element.targetServiceId,
					targetCtx: element.targetCtx || ctx,
					variationVarName: element.variationVarName
				});
			});
		}

		entry.depsClosed = true;
		entry.isOnlyTemplate = entry.depsLeft && entry.depsLeft.some(dl => dl.variationVarName !== undefined) || false;
		DiService.updateEntry(entry, ctx);
		this.checkIfReady(entry, ctx);

	}

	private static initService(entry: IDiEntry, ctx?: string) {

		if (!entry.object && entry.serviceClass) {
			const clazz = entry.serviceClass;
			entry.object = new (<any>clazz)();
		}

		entry.depsClosed = true;
		entry.isOnlyTemplate = entry.depsLeft && entry.depsLeft.some(dl => dl.variationVarName) || false;
		DiService.updateEntry(entry, ctx);
		this.checkIfReady(entry, ctx);

	}

	private static setServiceAsReady(entry: IDiEntry, ctx?: string) {

		if (entry.isReady) { return; }

		// If there are construction hadlers it means we need to create the object
		// with the required parameters before proceding
		if (entry.constructorHandlers) {

			const params: any[] = [];

			entry.constructorHandlers.forEach(handler => {
				if (handler.variationVarValue) {
					params[handler.index] = handler.variationVarValue;
				} else {
					const tEntry = DiService.getEntry(handler.targetServiceId, handler.targetCtx);
					if (tEntry) {
						params[handler.index] = tEntry.object;
					}
				}
			});

			if (entry.serviceClass) {
				const clazz = entry.serviceClass;
				entry.object = new (<any>clazz)(...params);
			}

		}

		if (!entry.object) {
			entry.object = new (<any>entry.serviceClass)();
		}

		const constructorHandlers = entry.constructorHandlers || [];
		const depsToBeInjectedBecouseVaration = entry.depsLeft ? entry.depsLeft.filter(dl =>
			dl.variationVarName &&
			dl.variationVarValue &&
			constructorHandlers.findIndex(ch => ch.variationVarName === dl.variationVarName) < 0
		) : [];
		if (depsToBeInjectedBecouseVaration.length > 0) {
			depsToBeInjectedBecouseVaration.forEach(dep => {
				entry.object[dep.variationVarName || ''] = dep.variationVarValue;
			});
		}

		DiService.updateEntry(entry, ctx);

		// Process ready
		this.processReadyService(entry, ctx).then(() => { /* */ });

	}

	private static async processReadyService(entry: IDiEntry, ctx?: string) {

		const servicesToSetAsReady: { entry: IDiEntry; ctx: string }[] = [];

		if (entry.serviceClass && this.hasOnInit(entry.object)) {
			await entry.object.onInit();
		}

		const matchedDeps = DiService.getAllRelatedDeps(entry.serviceId, ctx);
		Object.keys(matchedDeps).forEach(matCtx => {
			(<IDiEntry[]>matchedDeps[matCtx]).forEach(matEntry => {
				if (matEntry.depsLeft) {
					const dep = matEntry.depsLeft.find(depL => depL.targetServiceId === entry.serviceId);
					if (dep) { dep.depMet = true; }
				}
				if (this.hasAllDeps(matEntry)) {
					servicesToSetAsReady.push({ entry: matEntry, ctx: matCtx });
				} else {
					DiService.updateEntry(matEntry, matCtx);
				}
			});
		});

		if (entry.cbWaiting) {
			entry.cbWaiting.forEach((callBack: Function) => {
				callBack(entry.object);
			});
			// Only di.container manages entries so there are no races
			// eslint-disable-next-line require-atomic-updates
			entry.cbWaiting = undefined;
		}

		// eslint-disable-next-line require-atomic-updates
		entry.isReady = true;
		DiService.updateEntry(entry, ctx);
		EventUtils.onServiceReady(entry);

		if (servicesToSetAsReady.length > 0) {
			servicesToSetAsReady.forEach(element => {
				this.setServiceAsReady(element.entry, element.ctx);
			});
		}

	}

	/**
	 * Registers a new pending request for the given service,
	 * once the service is loaded all the requests will be executed
	 * @param serviceName
	 * @param ctx
	 */
	private static async waitForDep<T>(serviceName: string, ctx?: string, variation?: Record<string, any>) {

		const entry = DiService.getEnrySafely(serviceName, undefined, ctx);

		return new Promise<T>((resolve) => {

			const callBack = (resulutObj: any) => { resolve(resulutObj); };

			if (entry.cbWaiting) {
				entry.cbWaiting.push(callBack);
			} else {
				entry.cbWaiting = [callBack];
			}


			let isVariation = false;
			if (
				variation &&
				entry.serviceClass === undefined &&
				serviceName.indexOf(DiService.variationStart) >= 0 &&
				serviceName.indexOf(DiService.variationEnd) >= 0
			) {

				const originalServiceName = serviceName.substring(0, serviceName.indexOf(DiService.variationStart));
				const service = DiService.getEntry(originalServiceName, ctx);

				if (service) {
					console.log('service', entry, service);
					entry.serviceClass = service.serviceClass;
					entry.constructorHandlers = service.constructorHandlers ?
						service.constructorHandlers.map(a => ObjectUtils.deepClone(a)) : undefined;
					entry.depsLeft = service.depsLeft ?
						service.depsLeft.map(a => ObjectUtils.deepClone(a)) : undefined;
					entry.depsClosed = entry.depsLeft ? entry.depsLeft
						.filter(dl => dl.variationVarName === undefined)
						.every(dl => dl.depMet) : true;

					const depLeft = (entry.depsLeft || [])
						.filter(dl => dl.variationVarName !== undefined)
						.find(depLeft => (depLeft.variationVarName && Object.keys(variation).includes));
					if (depLeft) {
						depLeft.depMet = true;
						depLeft.variationVarValue = variation[depLeft.variationVarName || ''];
					}

					const constructorHandler = (entry.constructorHandlers || [])
						.filter(dl => dl.variationVarName !== undefined)
						.find(depLeft => (depLeft.variationVarName && Object.keys(variation).includes));
					if (constructorHandler) {
						constructorHandler.variationVarValue = variation[constructorHandler.variationVarName || ''];
					}

					isVariation = true;

				}
			}

			DiService.updateEntry(entry, ctx);

			if (isVariation) {
				console.log('isVariation', entry);
				this.checkIfReady(entry, ctx);
			}

		});

	}

	private static hasOnInit(arg: Record<string, any>): arg is IDiOnInit {
		return arg && (arg as IDiOnInit).onInit !== undefined;
	}

	private static hasAllDeps(entry: IDiEntry): boolean {

		let result = false;

		if (entry.depsLeft && entry.depsClosed) {
			let allPropsAreTrue = true;
			entry.depsLeft.forEach(dep => {
				if (!dep.depMet) {
					allPropsAreTrue = false;
				}
			});
			result = allPropsAreTrue;
		} else if (!entry.depsLeft) {
			result = true;
		}

		return result;

	}

	private static checkIfReady(entry: IDiEntry, ctx?: string) {

		if (!entry.isOnlyTemplate && this.hasAllDeps(entry)) {
			this.setServiceAsReady(entry, ctx);
		}

	}

	private static setServiceMetadata(clazz: Function, serviceId: IServiceIdentifier, ctx?: string) {

		(<any>clazz)[this.serviceMetadata] = <IDiServiceMetadata>{ serviceId, ctx };
	}

}
