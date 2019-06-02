import { Container } from './di.container';
import { IDiEntry, IServiceIdentifier } from './di.interfaces';

export class DiService {

	// -------------------------------------------------------------------------
	// Class vars
	// -------------------------------------------------------------------------

	private static readonly tmpCtx = 'tmpCtx';
	private static mainCtx: any = {};

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	public static genServiceId(service: IServiceIdentifier) {
		let result = '';

		if (typeof service === 'string') {
			result = service;
		} else if (service instanceof Function) {
			result = service.name;
		}
		return result;
	}

	/**
	 * Adds the given entry into the provided context.
	 * If no context is provided, then the global context will be used.
	 * @param entry
	 * @param ctx
	 */
	public static addEntry(entry: IDiEntry, ctx?: string) {

		const currctx = ctx || Container.globalCtx;
		const entries = this.getCtx(currctx);
		entries.push(entry);
		this.mainCtx[currctx] = entries;

	}

	/**
	 * Creates a IDiEntry with the minium required fields
	 * @param serviceId
	 * @param clazz
	 */
	public static createBasicEntry(serviceId: string, clazz?: Function): IDiEntry {

		return <IDiEntry>{
			serviceId,
			serviceClass: clazz,
			isReady: false,
			depsClosed: false
		};

	}

	/**
	 * Creates or updates the given entry into the provided context.
	 * If no context is provided, then the global context will be used.
	 * @param entry
	 * @param ctx
	 */
	public static updateEntry(entry: IDiEntry, ctx?: string) {

		const currctx = ctx || Container.globalCtx;
		const index = this.getIndexOf(entry.serviceId, currctx);
		if (index >= 0) {
			const entries = this.getCtx(currctx);
			entries[index] = entry;
			this.mainCtx[currctx] = entries;
		} else {
			this.addEntry(entry, currctx);
		}

	}

	/**
	 * Checks if exists an IDiEntry with the given serviceId in the provided context.
	 * If no context is provided, then the global context will be used.
	 * @param serviceId
	 * @param ctx
	 */
	public static exists(serviceId: string, ctx?: string): boolean {

		return this.getEntry(serviceId, ctx) ? true : false;

	}

	/**
	 * Tries to retrieve an IDiEntry with the given serviceId in the provided context.
	 * If no entry is found, it will return undefined.
	 * If no context is provided, then the global context will be used.
	 * @param serviceId
	 * @param ctx
	 */
	public static getEntry(serviceId: string, ctx?: string): IDiEntry | undefined {

		return this.getCtx(ctx || Container.globalCtx).find(entry => entry.serviceId === serviceId);

	}

	/**
	 * Tries to find the index an IDiEntry with the given serviceId in the provided context.
	 * If no entry is found, it will return -1.
	 * If no context is provided, then the global context will be used.
	 * @param serviceId
	 * @param ctx
	 */
	public static getIndexOf(serviceId: string, ctx?: string): number {

		return this.getCtx(ctx || Container.globalCtx).findIndex(el => el.serviceId === serviceId);

	}

	/**
	 * Gets or creates the entry with the given parameters.
	 * If no context is provided, then the global context will be used.
	 * @param serviceId
	 * @param clazz
	 * @param ctx
	 */
	public static getEnrySafely(serviceId: string, clazz?: Function, ctx?: string): IDiEntry {

		const entry = this.getEntry(serviceId, ctx);
		if (entry) {
			if (clazz) { entry.serviceClass = clazz; }
			return entry;
		} else {
			return this.createBasicEntry(serviceId, clazz);
		}

	}

	/**
	 * Checks the property 'isReady' in the IDiEntry from the provided context.
	 * If no entry is found, it returns false.
	 * If no context is provided, then the global context will be used.
	 * @param serviceId
	 * @param ctx
	 */
	public static depIsReady(serviceId: string, ctx?: string): boolean {

		const entry = this.getEntry(serviceId, ctx);
		return entry ? entry.isReady : false;

	}

	/**
	 * Returns all the IDiEntry inside the provided context
	 * @param ctx
	 */
	public static getAll(ctx?: string): IDiEntry[] {

		return this.getCtx(ctx || Container.globalCtx);

	}

	/**
	 * Gets or creates the entry with the given serviceId in a temporal context.
	 * If the class is provided it will try to set it in the result object.
	 * @param serviceId
	 * @param clazz
	 */
	public static getTmpEnrySafely(serviceId: string, clazz?: Function): IDiEntry {

		const entry = this.getEntry(serviceId, this.tmpCtx);
		if (entry) {
			if (clazz) { entry.serviceClass = clazz; }
			return entry;
		} else {
			return this.createBasicEntry(serviceId, clazz);
		}

	}

	/**
	 * Updates or creates the entry with the given serviceId in a temporal context.
	 * If the class is provided it will try to set it in the result object.
	 * @param serviceId
	 * @param clazz
	 */
	public static updateTmpEnry(entry: IDiEntry) {

		this.updateEntry(entry, this.tmpCtx);

	}

	/**
	 * Removes the entry from the temporal context. Returns true
	 * if the entry was found.
	 * @param serviceId
	 * @param clazz
	 */
	public static discardTmpEntry(serviceId: string): boolean {

		let result = false;
		const indx = this.getIndexOf(serviceId, this.tmpCtx);
		if (indx >= 0) {
			const newCtx = this.getCtx(this.tmpCtx);
			newCtx.splice(indx, 1);
			this.updateCtx(this.tmpCtx, newCtx);
			result = true;
		}
		return result;

	}

	/**
	 * Finds all the IDiEntry that have a depLeft with the given serviceId and
	 * context. The result object is
	 * @param serviceId
	 * @param ctx
	 */
	public static getAllRelatedDeps(serviceId: string, ctx?: string): any {

		const result: any = {};
		ctx = ctx || Container.globalCtx;
		Object.keys(this.mainCtx).forEach(matCtx => {
			const foundDeps = this.getCtx(matCtx).filter(entry => {
				if (entry.depsLeft) {
					return entry.depsLeft.find(
						depLeft => depLeft.targetServiceId === serviceId &&
							(depLeft.targetCtx || matCtx) === ctx
					) ? true : false;
				} else {
					return false;
				}
			});

			if (foundDeps && foundDeps.length > 0) {
				result[matCtx] = foundDeps;
			}
		});

		return result;

	}

	/**
	 * Overrides the metada field for the given service with the provided metadata
	 * @param serviceId
	 * @param metadata
	 * @param ctx
	 */
	public static updateMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean, ctx?: string) {
		const entry = this.getEnrySafely(this.genServiceId(serviceId), undefined, ctx);

		if (merge) {
			entry.metadata = { ...(entry.metadata || {}), ...metadata };
		} else {
			entry.metadata = metadata;
		}

		this.updateEntry(entry, ctx);
	}

	/**
	 * Tries to return the metadata field of the given service, it will return
	 * undefined if the service doesn't exists or the field has not ben set
	 * @param serviceId
	 * @param ctx
	 */
	public static getMetadata(serviceId: IServiceIdentifier, ctx?: string): any | undefined {
		const entry = this.getEntry(this.genServiceId(serviceId), ctx);
		if (entry) {
			return entry.metadata;
		} else {
			return undefined;
		}
	}

	/**
	 * Overrides the metada field for the given service with the provided metadata
	 * @param serviceId
	 * @param metadata
	 * @param ctx
	 */
	public static updateTmpMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean) {
		this.updateMetadata(serviceId, metadata, merge, this.tmpCtx);
	}

	/**
	 * Tries to return the metadata field of the given service, it will return
	 * undefined if the service doesn't exists or the field has not ben set
	 * @param serviceId
	 * @param ctx
	 */
	public static getTmpMetadata(serviceId: IServiceIdentifier): any | undefined {
		return this.getMetadata(serviceId, this.tmpCtx);
	}

	// -------------------------------------------------------------------------
	// Private methods
	// -------------------------------------------------------------------------

	private static getCtx(ctx: string): IDiEntry[] {

		let result = this.mainCtx[ctx];
		if (!result) { result = []; }
		return <IDiEntry[]>result;

	}

	private static updateCtx(ctx: string, entries: IDiEntry[]) {

		this.mainCtx[ctx] = entries;

	}

}
