import { IDiServiceMetadata } from './di.interfaces';
export declare class DiUtils {
    private static readonly defaultDependencyTimeout;
    /**
     * Loads all the js files recursively in the given path, and waits for all the
     * services to be loaded.
     * @param folderPath
     */
    static waitForFolder(folderPath: string, recursive?: boolean, dependencyTimeout?: number): Promise<IDiServiceMetadata[]>;
    /**
     * Returns a list of all the classes loaded by the loadFolder function
     * @param jsFiles
     */
    static getClasses(jsFiles: any[]): Function[];
    /**
     * Reads the result from waitForFolder function and generates an string
     * with the prefix, a comma separated list of services, and if the services are empty
     * or null/undefined, then the result will be the notFound parameter
     * @param data
     */
    static getServicesAsString(prefix: string, services: IDiServiceMetadata[], notFound: string): string;
}
