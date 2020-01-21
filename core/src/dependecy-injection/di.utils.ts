import { FsUtils } from '../io/fs.utils';
import { Container } from './di.container';
import { IDiServiceMetadata } from './di.shared';
import { DiService } from './di.service';

export class DiUtils {

	private static readonly defaultDependencyTimeout = 10 * 1000;

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	/**
	 * Loads all the js files recursively in the given path, and waits for all the
	 * services to be loaded.
	 * @param folderPath
	 */
	public static async waitForFolder(folderPath: string, recursive?: boolean, dependencyTimeout?: number): Promise<IDiServiceMetadata[]> {

		const jsFiles = await FsUtils.loadJsFolder(folderPath, recursive);
		const services: IDiServiceMetadata[] = [];
		const classes = this.getClasses(jsFiles);

		// Load all classes that have metadata (Services)
		classes.forEach(clazz => {
			const clazzMetadata = Container.getServiceMetadata(clazz);
			if (clazzMetadata) {
				services.push(clazzMetadata);
			}
		});

		setTimeout(() => {
			services.forEach(service => {
				const serviceId = DiService.genServiceId(service.serviceId);
				const entry = DiService.getEntry(serviceId, service.ctx);
				if (!entry) {
					console.error(
						`No dependencies has been found for service: ${serviceId} ` +
						`in context: ${service.ctx}`);
				} else if (!entry.isReady) {
					const depsLeft = entry.depsLeft || <{ targetServiceId: string; depMet: boolean }[]> [];
					const missingDeps = depsLeft.filter(dep => !dep.depMet).map(dl => dl.targetServiceId);
					console.error(
						`The following dependencies couldn't be found for service: ${serviceId} ` +
						`in context: ${service.ctx} => ${missingDeps.join(',')}`);
				}
			});

		}, dependencyTimeout || this.defaultDependencyTimeout);

		// Wait for all the  services to be loaded
		if (services && services.length > 0) {
			await Container.waitFor(services);
		}

		return services;
	}

	/**
	 * Reads the result from waitForFolder function and generates an string
	 * with the prefix, a comma separated list of services, and if the services are empty
	 * or null/undefined, then the result will be the notFound parameter
	 * @param data
	 */
	public static getServicesAsString(prefix: string, services: IDiServiceMetadata[], notFound: string): string {
		let result = notFound;

		if (services && services.length > 0) {

			const serviceIds: string[] = [];
			services.forEach(serviceMetadata => {
				serviceIds.push(
					DiService.genServiceId(serviceMetadata.serviceId)
				);
			});

			result = prefix + serviceIds.join(', ');

		}

		return result;
	}

	// -------------------------------------------------------------------------
	// Private methods
	// -------------------------------------------------------------------------

	/**
	 * Returns a list of all the classes loaded by the loadFolder function
	 * @param jsFiles
	 */
	private static getClasses(jsFiles: any[]): Function[] {
		const result: Function[] = [];

		jsFiles.forEach(jsFile => {
			Object.keys(jsFile).forEach(key => {
				const moduleExport = jsFile[key];
				if (moduleExport instanceof Function) {
					result.push(moduleExport);
				}
			});
		});

		return result;
	}

}
