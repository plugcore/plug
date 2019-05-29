export declare type inMsg = (string | object)[];
/**
 * Class designed to be injected if other beans to handle all the log levels
 */
export declare class Logger {
    private logFileName;
    private logFileDescriptor;
    private isLogFile;
    private queue;
    constructor(logFileName: string);
    debug(...inMsgs: inMsg): void;
    info(...inMsgs: inMsg): void;
    warning(...inMsgs: inMsg): void;
    error(...inMsgs: inMsg): void;
    fatal(...inMsgs: inMsg): void;
    private processMsg;
    private showLog;
    private prepareJson;
    private queueLog;
    private processLog;
    private saveLogJson;
}
