import { ObjectUtils } from '../utils/object.utils';
import { ClassParameter } from '../utils/typescript.utils';
import { IDiConstructorHandler, IDiDepLeft, IDiEntry, IDiServiceMetadata, IServiceIdentifier, OnInit, OnServiceReadyCallback } from './di.shared';
import { DiService } from './di.service';

/**
 * Service container.
 */
export class Container {

	// -------------------------------------------------------------------------
	// Constants
	// -------------------------------------------------------------------------

	/**
	 * You can use this constant in order to inject services
	 * from the global context in context scoped services.
	 * ej `@Inject({ ctx:  }) `
	 */
	public static readonly globalCtx = 'GLOBAL';

	/**
	 * Defines the variation var name that interanlly wiil be used
	 * to inject connection names
	 */
	public static readonly connection = 'connection';

	private static readonly serviceMetadata = 'diServiceMetadata';

	// -------------------------------------------------------------------------
	// Private variables
	// -------------------------------------------------------------------------

	private static onServiceReadyCallbacks: OnServiceReadyCallback[] = [];

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	/**
	 * Registers the given Class as a new service and it will try to create a new instance
	 * and return it to any Container.get requesting this IServiceIdentifier as soon as
	 * all the dependecies are met
	 */
	public static registrerService<T>(inp: {
		id: IServiceIdentifier<T>;
		clazz: ClassParameter<T>;
		params?: ClassParameter<any>[];
		ctx?: string;
		connection?: string;
	}) {

		const serviceId = DiService.genServiceId(inp.id);
		const entry = DiService.getTmpEnrySafely(serviceId, inp.clazz);

		this.setServiceMetadata(inp.clazz, inp.id, inp.ctx);
		DiService.discardTmpEntry(serviceId);
		entry.serviceId = DiService.genServiceId(inp.id);

		// Check if there is any dependency with @Inject
		// that requires the connection
		this.updateDependenciesWithConnectionIfNecessary(entry.depsLeft, inp.connection);

		// All property dependencies that are queued have to be called.
		// This also checks if the serviceId changes becouse of the connection
		this.resolveServiceProperties(entry, inp.connection);

		if (inp.params && inp.params.length > 0) {
			this.initConstructorService({
				entry, params: inp.params, ctx: inp.ctx, connection: inp.connection
			});
		} else {
			this.initService(entry, inp.ctx);
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
	public static set<T>(serviceClass: ClassParameter<T>, instance: T, id?: string, ctx?: string) {

		const serviceId = id || serviceClass;

		this.setServiceMetadata(serviceClass, serviceId, ctx);

		const serviceName = DiService.genServiceId(serviceId);
		const entry = DiService.getEnrySafely(serviceName, serviceClass, ctx);
		entry.object = instance;
		entry.depsLeft = undefined;
		entry.constructorHandlers = undefined;

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
		serviceId: string | ClassParameter<T>, variation?: Record<string, any>, ctx?: string
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
	 * Shorcut for `Container.get()` when you want a dependency from
	 * a specific context
	 * @param serviceId
	 * @param ctx
	 */
	public static async getFromContext<T>(
		serviceId: string | ClassParameter<T>, ctx?: string
	): Promise<T> {

		return this.get(serviceId, undefined, ctx);

	}

	/**
	 * * Used for internal operations *
	 * This will wait for the target service to be ready and returns it.
	 * It takes into consideration the service connection
	 * @param serviceId
	 * @param ctx
	 */
	public static async getServiceProperty<T>(inp: {
		originalService: {
			id: IServiceIdentifier;
			clazz: ClassParameter<T>;
		};
		targetService: {
			id: IServiceIdentifier;
			ctx?: string;
			variation?: Record<string, any>;
		};
	}): Promise<T> {

		const originalServiceId = DiService.genServiceId(inp.originalService.id);
		const orignalService = DiService.getTmpEnrySafely(originalServiceId, inp.originalService.clazz);

		if (!orignalService) {
			throw new Error('Service not found for this property');
		}

		return new Promise(resolve => {
			orignalService.propertiesWaiting = (orignalService.propertiesWaiting || []).concat({
				id: inp.targetService.id,
				ctx: inp.targetService.ctx,
				variation: inp.targetService.variation,
				cb: resolve
			});
		});

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
		const targetServiceName = DiService.genServiceId(inp.targetId, inp.variation);

		let entry = DiService.getTmpEnrySafely(serviceName);
		entry = this.updateConstructorHandler({
			entry,
			index: inp.index,
			targetServiceName,
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName,
			variation: inp.variation
		});

		if (inp.update) {
			DiService.updateTmpEnry(entry);
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
				contDeps.push(Container.get(dep.serviceId, undefined, dep.ctx));
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

	/**
	 * Registar a callback that is going to be called for every service
	 * that has been set as ready or that has already been marked
	 * @param callback
	 */
	public static onServiceReady(callback: OnServiceReadyCallback) {

		// 1: Check if any entris has beed set as ready
		// before registreing this callback
		const readyEntries = DiService.getAllReadyEntries();
		for (const entry of readyEntries) {
			callback(entry);
		}

		// 2: Then store the callback inside an array
		// for future services
		this.onServiceReadyCallbacks.push(callback);

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
		variation?: Record<string, any>;
	}): IDiEntry {
		const newHandler = {
			targetServiceId: inp.targetServiceName,
			index: inp.index,
			targetCtx: inp.targetCtx,
			variationVarName: inp.variationVarName,
			variation: inp.variation
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

	private static initConstructorService(inp: {
		entry: IDiEntry;
		params: ClassParameter<any>[];
		ctx?: string;
		connection?: string;
	}) {

		for (const [index, targetClass] of inp.params.entries()) {
			const targetServiceName = DiService.genServiceId(targetClass);
			// This will create a dep only if it's not been decorated with @inject() before
			inp.entry = this.updateConstructorHandler({
				entry: inp.entry,
				index,
				targetServiceName,
				targetCtx: inp.ctx
			});
		}

		// Check if there is any dependency with @Inject
		// that requires the connection
		this.updateDependenciesWithConnectionIfNecessary(inp.entry.constructorHandlers, inp.connection);

		for (const element of inp.entry.constructorHandlers || []) {

			inp.entry = this.registerEntryDepLeft({
				entry: inp.entry,
				targetServiceName: element.targetServiceId,
				targetCtx: element.targetCtx || inp.ctx,
				variationVarName: element.variationVarName
			});

			if (element.variation) {
				const targetEntry = DiService.getEntry(element.targetServiceId, element.targetCtx || inp.ctx);

				if (inp.entry.depsLeft && targetEntry && targetEntry.isReady) {
					const targetDep = inp.entry.depsLeft.find(dl => dl.targetServiceId === element.targetServiceId);
					if (targetDep) {
						targetDep.depMet = true;
					}
				}

				if (!targetEntry) {

					this.waitForDep(element.targetServiceId, element.targetCtx || inp.ctx, element.variation).then(() => {
						const updatedEntry = DiService.getEntry(inp.entry.serviceId, inp.ctx);
						if (updatedEntry && !updatedEntry.isReady && updatedEntry.depsLeft) {
							for (const depLeft of updatedEntry.depsLeft) {
								const targetService = DiService.getEntry(depLeft.targetServiceId, depLeft.targetCtx);
								if (targetService && targetService.isReady) {
									depLeft.depMet = true;
								}
							}
							this.checkIfReady(inp.entry, inp.ctx);
						}
					});
				}
			}
		}

		inp.entry.depsClosed = true;
		inp.entry.isOnlyTemplate = inp.entry.depsLeft && inp.entry.depsLeft.some(dl => dl.variationVarName !== undefined) || false;
		DiService.updateEntry(inp.entry, inp.ctx);

		this.checkIfReady(inp.entry, inp.ctx);

	}

	private static initService(entry: IDiEntry, ctx?: string) {

		if (entry.object === undefined && entry.serviceClass) {
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
			try {
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
			} catch (error) {
				this.get('Logger').then((log: any) => log.error(error));
			}

		}

		if (entry.object === undefined) {
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
		this.processReadyService(entry, ctx)
			.then(() => { /* */ })
			.catch(error => { this.get('Logger').then((log: any) => log.error(error)); });


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

		for (const callback of this.onServiceReadyCallbacks) {
			try {
				callback(entry);
			} catch (error) {
				this.get('Logger').then((log: any) => log.error(error));
			}
		}

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

				const service = DiService.getTemplateEntry(serviceName, ctx);

				if (service) {
					entry.serviceClass = service.serviceClass;
					entry.depsClosed = true;
					entry.constructorHandlers = service.constructorHandlers ?
						service.constructorHandlers.map(a => ObjectUtils.deepClone(a)) : undefined;
					entry.depsLeft = service.depsLeft ?
						service.depsLeft.map(a => ObjectUtils.deepClone(a)) : undefined;

					if (entry.depsLeft) {
						for (const depLeft of entry.depsLeft) {
							if (variation[depLeft.variationVarName || ''] !== undefined) {
								depLeft.depMet = true;
								depLeft.variationVarValue = variation[depLeft.variationVarName || ''];
							}
						}
					}

					if (entry.constructorHandlers) {
						for (const constructorHandler of entry.constructorHandlers) {
							if (variation[constructorHandler.variationVarName || ''] !== undefined) {
								constructorHandler.variationVarValue = variation[constructorHandler.variationVarName || ''];
							}
						}
					}

					isVariation = true;

				}
			}

			DiService.updateEntry(entry, ctx);

			if (isVariation) {
				this.checkIfReady(entry, ctx);
			}

		});

	}

	private static hasOnInit(arg: Record<string, any>): arg is OnInit {
		return arg && (arg as OnInit).onInit !== undefined;
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
		if (this.hasAllDeps(entry)) {
			try {
				this.setServiceAsReady(entry, ctx);
			} catch (error) {
				this.get('Logger').then((log: any) => log.error(error));
			}
		}
	}

	private static setServiceMetadata(clazz: Function, serviceId: IServiceIdentifier, ctx?: string) {
		(<any>clazz)[this.serviceMetadata] = <IDiServiceMetadata>{ serviceId, ctx };
	}

	private static updateDependenciesWithConnectionIfNecessary(
		deps: IDiEntry['constructorHandlers'] | IDiEntry['depsLeft'],
		connection?: string
	) {
		if (connection && deps) {
			for (const dep of deps) {

				const targetService = DiService.getTemplateEntry(dep.targetServiceId, dep.targetCtx);
				if (
					targetService && targetService.depsLeft &&
					targetService.depsLeft.findIndex(d => d.variationVarName === Container.connection) >= 0
				) {
					const variation = { [Container.connection]: connection };
					const variationTargetId = DiService.genServiceId(dep.targetServiceId, variation);
					dep.targetServiceId = variationTargetId;
					if (this.isConstructorHandler(dep)) {
						dep.variation = Object.assign(dep.variation ||{}, variation);
					} else if (!dep.depMet) {
						this.waitForDep(variationTargetId, dep.targetCtx, variation).then();
					}
				}

			}
		}
	}

	private static isConstructorHandler(dep: IDiDepLeft | IDiConstructorHandler): dep is IDiConstructorHandler {
		return typeof (<any>dep).index === 'number' || false;
	}

	private static resolveServiceProperties(entry: IDiEntry, connection?: string) {

		if (entry.propertiesWaiting) {
			for (const propWaiting of entry.propertiesWaiting) {

				if (connection) {
					const targetServiceId = DiService.genServiceId(propWaiting.id);
					const targetService = DiService.getEntry(targetServiceId, propWaiting.ctx);

					// If we are setting the properties of a service with a connection
					// then the service id and varation of the dependency will change

					if (
						targetService && targetService.depsLeft &&
						targetService.depsLeft.findIndex(d => d.variationVarName === Container.connection) >= 0
					) {
						const variation = Object.assign(propWaiting.variation || {}, { [Container.connection]: connection });
						const newTargetId = DiService.genServiceId(propWaiting.id, variation);
						Container.get(newTargetId, propWaiting.variation, propWaiting.ctx).then(propWaiting.cb);
					} else {
						Container.get(propWaiting.id, propWaiting.variation, propWaiting.ctx).then(propWaiting.cb);
					}

				} else {
					Container.get(propWaiting.id, propWaiting.variation, propWaiting.ctx).then(propWaiting.cb);
				}

			}
		}

	}

}
