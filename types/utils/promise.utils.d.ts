export declare class PromiseUtils {
    /**
     * Executes a large list of promises in batch, but sinces functions that create promises
     * are executen the moment you call them, yo can't just execute all of them at once, therefore
     * you have to pass an array of elemnts and a function that will convert those elements into a promise
     * to be executed
     * @param sourceObjs Source objects
     * @param funcPerObj Function to convert said object into a promise
     * @param batchSize Number of promises to execute at the same time
     */
    static execInBatch<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>, batchSize: number): Promise<(R | Error)[]>;
    /**
     * Executes the function for each object in the array secuentially
     * @param sourceObjs
     * @param funcPerObj
     */
    static execSecuentally<T, R>(sourceObjs: T[], funcPerObj: (obj: T) => Promise<R>): Promise<R[]>;
    /**
     * Waits for a promise to resolve x seconds, if it doesn't respond or it
     * generates an error, the promise gets rejected
     * @param promiseToExec
     * @param secs
     */
    static timeOut<T>(promiseToExec: Promise<T>, secs: number): Promise<T>;
    /**
     * Generates a promise that will wait what you pass to it
     * @param milsToWait
     */
    static wait(milsToWait: number): Promise<{}>;
}
