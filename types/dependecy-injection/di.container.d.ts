import { IDiServiceMetadata, IServiceIdentifier } from './di.interfaces';
/**
 * Service container.
 */
export declare class Container {
    static readonly globalCtx = "GLOBAL";
    static readonly serviceMetadata = "diServiceMetadata";
    /**
     * Registers the given Class as a new service and it will try to create a new instance
     * and return it to any Container.get requesting this IServiceIdentifier as soon as
     * all the dependecies are met
     * @param id
     * @param clazz
     * @param params
     * @param ctx
     */
    static registrerService(id: IServiceIdentifier, clazz: Function, params?: Function[], ctx?: string): void;
    /**
     * Sets the given service with its instance and marks it as ready, so
     * other services can have it as dependency.
     * @param serviceClass
     * @param instance
     * @param serviceId
     * @param ctx
     */
    static set(serviceClass: Function, instance: Object, id?: string, ctx?: string): void;
    /**
     * Returns the requested service once all it's dependencies has been
     * met. This method keep the current thread alive until it returns
     * a value.
     * @param serviceId
     * @param ctx
     */
    static get<T>(serviceId: IServiceIdentifier, ctx?: string): Promise<T>;
    /**
     * Internal usage only, it registers a Class property as dependency for the service
     * @param serviceId
     * @param targetServiceId
     * @param ctx
     * @param update
     */
    static registerDepLeft(serviceId: IServiceIdentifier, targetServiceId: IServiceIdentifier, targetCtx?: string, update?: boolean): void;
    /**
     * Internal usage only, it register a class constructor property, it's the only way
     * you can se parameters like serviceId or context
     * @param id
     * @param targetId
     * @param index
     * @param ctx
     * @param udate
     */
    static registrerConstructorHandler(id: IServiceIdentifier, targetId: IServiceIdentifier, index: number, targetCtx?: string, udate?: boolean): void;
    /**
     * Returns a promise that gets executed once all the dependecies
     * passed in the input array are met
     * @param deps
     */
    static waitFor(deps: IDiServiceMetadata[]): Promise<void>;
    /**
     * Returns the service metadata attached to the function if it exists
     * (then it means this class is controlled by the container) or undefined
     * if no metadata is found
     * @param clazz
     */
    static getServiceMetadata(clazz: Function): IDiServiceMetadata | undefined;
    private static registerEntryDepLeft;
    private static updateConstructorHandler;
    private static initConstructorService;
    private static initService;
    private static setServiceAsReady;
    private static processReadyService;
    /**
     * Registers a new pending request for the given service,
     * once the service is loaded all the requests will be executed
     * @param serviceName
     * @param ctx
     */
    private static waitForDep;
    private static hasOnInit;
    private static hasAllDeps;
    private static checkIfReady;
    private static setServiceMetadata;
}
