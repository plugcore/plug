import { IDiEntry, IDiOnInit, IDiServiceMetadata, IServiceIdentifier } from './di.interfaces';
import { DiService } from './di.service';
import { EventUtils } from '../events/event.utils';

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
	public static async get<T>(serviceId: IServiceIdentifier, ctx?: string): Promise<T> {

		const serviceName = DiService.genServiceId(serviceId);
		const entry = DiService.getEntry(serviceName, ctx);

		if (entry && entry.isReady) {
			return entry.object;
		} else {
			return await this.waitForDep<T>(serviceName, ctx);
		}

	}

	/**
	 * Internal usage only, it registers a Class property as dependency for the service
	 * @param serviceId
	 * @param targetServiceId
	 * @param ctx
	 * @param update
	 */
	public static registerDepLeft(serviceId: IServiceIdentifier, targetServiceId: IServiceIdentifier, targetCtx?: string, update?: boolean) {

		const serviceName = DiService.genServiceId(serviceId);
		const targetServiceName = DiService.genServiceId(targetServiceId);
		let entry = DiService.getTmpEnrySafely(serviceName);

		entry = this.registerEntryDepLeft(entry, targetServiceName, targetCtx);

		if (update) {
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
	 * @param udate
	 */
	public static registrerConstructorHandler(
		id: IServiceIdentifier, targetId: IServiceIdentifier, index: number, targetCtx?: string, udate?: boolean
	) {

		const serviceName = DiService.genServiceId(id);
		const targetServiceName = DiService.genServiceId(targetId);

		let entry = DiService.getTmpEnrySafely(serviceName);
		entry = this.updateConstructorHandler(entry, index, targetServiceName, targetCtx);

		if (udate) {
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

	private static registerEntryDepLeft(entry: IDiEntry, targetServiceName: string, targetCtx?: string): IDiEntry {

		const newDepLeft = {
			targetServiceId: targetServiceName,
			depMet: DiService.depIsReady(targetServiceName, targetCtx),
			targetCtx
		};

		if (entry.depsLeft) {
			const hIndex = entry.depsLeft
				.findIndex(el => el.targetServiceId === targetServiceName);
			if (hIndex === -1) {
				entry.depsLeft.push(newDepLeft);
			} else {
				entry.depsLeft[hIndex] = newDepLeft;
			}
		} else {
			entry.depsLeft = [newDepLeft];
		}

		return entry;

	}

	private static updateConstructorHandler(entry: IDiEntry, index: number, targetServiceName: string, targetCtx?: string): IDiEntry {
		const newHandler = {
			targetServiceId: targetServiceName,
			index,
			targetCtx
		};
		if (entry.constructorHandlers) {
			const hIndex = entry.constructorHandlers
				.findIndex(el => el.index === index);
			if (hIndex === -1) {
				entry.constructorHandlers.push(newHandler);
			}
		} else {
			entry.constructorHandlers = [newHandler];
		}
		return entry;
	}

	private static initConstructorService(entry: IDiEntry, params: Function[], ctx?: string) {

		params.forEach((targetClass, index) => {
			const targetServiceName = DiService.genServiceId(targetClass);
			entry = this.updateConstructorHandler(entry, index, targetServiceName, ctx);
		});

		if (entry.constructorHandlers) {
			entry.constructorHandlers.forEach(element => {
				entry = this.registerEntryDepLeft(entry,
					element.targetServiceId, element.targetCtx || ctx);
			});
		}

		entry.depsClosed = true;
		DiService.updateEntry(entry, ctx);
		this.checkIfReady(entry, ctx);

	}

	private static initService(entry: IDiEntry, ctx?: string) {

		if (!entry.object && entry.serviceClass) {
			const clazz = entry.serviceClass;
			entry.object = new (<any>clazz)();
		}

		entry.depsClosed = true;
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
				const tEntry = DiService.getEntry(handler.targetServiceId, handler.targetCtx);
				if (tEntry) {
					params[handler.index] = tEntry.object;
				}
			});

			if (entry.serviceClass) {
				const clazz = entry.serviceClass;
				entry.object = new (<any>clazz)(...params);
			}

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
	private static async waitForDep<T>(serviceName: string, ctx?: string) {

		const entry = DiService.getEnrySafely(serviceName, undefined, ctx);

		return new Promise<T>((resolve) => {

			const callBack = (resulutObj: any) => { resolve(resulutObj); };

			if (entry.cbWaiting) {
				entry.cbWaiting.push(callBack);
			} else {
				entry.cbWaiting = [callBack];
			}

			DiService.updateEntry(entry, ctx);

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

		if (this.hasAllDeps(entry)) {
			this.setServiceAsReady(entry, ctx);
		}

	}

	private static setServiceMetadata(clazz: Function, serviceId: IServiceIdentifier, ctx?: string) {

		(<any>clazz)[this.serviceMetadata] = <IDiServiceMetadata>{ serviceId, ctx };
	}

}
