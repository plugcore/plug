import 'reflect-metadata';
import { IServiceArgs } from './di.interfaces';
/**
 * Service decortor made to easily registrer the class into the container
 * @param sId
 */
export declare function Service({ ctx, sId }?: IServiceArgs): Function;
/**
 * Injects the dependency into the property. It can be placed in a property
 * definition at class level or at constructor level
 * @param sId
 */
export declare function Inject({ sId, ctx }?: IServiceArgs): Function;
