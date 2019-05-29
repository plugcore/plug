import { IServiceArgs } from '../dependecy-injection/di.interfaces';
export declare function Scheduler({ sId, ctx }?: IServiceArgs): (target: Function) => void;
/**
 *
 * @param cronExp
 */
export declare function ScheduledJob(cronExp: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
