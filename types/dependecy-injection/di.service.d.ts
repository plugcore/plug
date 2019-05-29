import { IDiEntry, IServiceIdentifier } from './di.interfaces';
export declare class DiService {
    private static readonly tmpCtx;
    private static mainCtx;
    static genServiceId(service: IServiceIdentifier): string;
    /**
     * Adds the given entry into the provided context.
     * If no context is provided, then the global context will be used.
     * @param entry
     * @param ctx
     */
    static addEntry(entry: IDiEntry, ctx?: string): void;
    /**
     * Creates a IDiEntry with the minium required fields
     * @param serviceId
     * @param clazz
     */
    static createBasicEntry(serviceId: string, clazz?: Function): IDiEntry;
    /**
     * Creates or updates the given entry into the provided context.
     * If no context is provided, then the global context will be used.
     * @param entry
     * @param ctx
     */
    static updateEntry(entry: IDiEntry, ctx?: string): void;
    /**
     * Checks if exists an IDiEntry with the given serviceId in the provided context.
     * If no context is provided, then the global context will be used.
     * @param serviceId
     * @param ctx
     */
    static exists(serviceId: string, ctx?: string): boolean;
    /**
     * Tries to retrieve an IDiEntry with the given serviceId in the provided context.
     * If no entry is found, it will return undefined.
     * If no context is provided, then the global context will be used.
     * @param serviceId
     * @param ctx
     */
    static getEntry(serviceId: string, ctx?: string): IDiEntry | undefined;
    /**
     * Tries to find the index an IDiEntry with the given serviceId in the provided context.
     * If no entry is found, it will return -1.
     * If no context is provided, then the global context will be used.
     * @param serviceId
     * @param ctx
     */
    static getIndexOf(serviceId: string, ctx?: string): number;
    /**
     * Gets or creates the entry with the given parameters.
     * If no context is provided, then the global context will be used.
     * @param serviceId
     * @param clazz
     * @param ctx
     */
    static getEnrySafely(serviceId: string, clazz?: Function, ctx?: string): IDiEntry;
    /**
     * Checks the property 'isReady' in the IDiEntry from the provided context.
     * If no entry is found, it returns false.
     * If no context is provided, then the global context will be used.
     * @param serviceId
     * @param ctx
     */
    static depIsReady(serviceId: string, ctx?: string): boolean;
    /**
     * Returns all the IDiEntry inside the provided context
     * @param ctx
     */
    static getAll(ctx?: string): IDiEntry[];
    /**
     * Gets or creates the entry with the given serviceId in a temporal context.
     * If the class is provided it will try to set it in the result object.
     * @param serviceId
     * @param clazz
     */
    static getTmpEnrySafely(serviceId: string, clazz?: Function): IDiEntry;
    /**
     * Updates or creates the entry with the given serviceId in a temporal context.
     * If the class is provided it will try to set it in the result object.
     * @param serviceId
     * @param clazz
     */
    static updateTmpEnry(entry: IDiEntry): void;
    /**
     * Removes the entry from the temporal context. Returns true
     * if the entry was found.
     * @param serviceId
     * @param clazz
     */
    static discardTmpEntry(serviceId: string): boolean;
    /**
     * Finds all the IDiEntry that have a depLeft with the given serviceId and
     * context. The result object is
     * @param serviceId
     * @param ctx
     */
    static getAllRelatedDeps(serviceId: string, ctx?: string): any;
    /**
     * Overrides the metada field for the given service with the provided metadata
     * @param serviceId
     * @param metadata
     * @param ctx
     */
    static updateMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean, ctx?: string): void;
    /**
     * Tries to return the metadata field of the given service, it will return
     * undefined if the service doesn't exists or the field has not ben set
     * @param serviceId
     * @param ctx
     */
    static getMetadata(serviceId: IServiceIdentifier, ctx?: string): any | undefined;
    /**
     * Overrides the metada field for the given service with the provided metadata
     * @param serviceId
     * @param metadata
     * @param ctx
     */
    static updateTmpMetadata(serviceId: IServiceIdentifier, metadata: any, merge?: boolean): void;
    /**
     * Tries to return the metadata field of the given service, it will return
     * undefined if the service doesn't exists or the field has not ben set
     * @param serviceId
     * @param ctx
     */
    static getTmpMetadata(serviceId: IServiceIdentifier): any | undefined;
    private static getCtx;
    private static updateCtx;
}
