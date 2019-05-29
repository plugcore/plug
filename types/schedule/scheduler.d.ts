export declare class CronUtils {
    private static cronPattern;
    private static rangeRegex;
    private static months;
    private static shortMonths;
    private static weekDays;
    private static shortWeekDays;
    private static wildCard;
    private static hyphen;
    private static comma;
    private static ranges;
    static createCronJob(expression: string, method: Function, clazz?: string | Function): void;
    private static manageCronExecution;
    static getTimeInMs(cronExp: number[][], previousDate?: any): number;
    private static checkRange;
    static validateCron(expression: string): number[][];
    /**
     * 1. We parse the non numeric values
     * @param value
     * @param field
     * @param longVals
     * @param shortVals
     */
    private static replaceTextToNumber;
    /**
     * 2. Translate all wildcards to a given range of values
     * @param value
     * @param field
     */
    private static replaceWildCard;
    /**
     * 3. Parse ranges to plane numbers and return the values joined
     * @param value
     * @param field
     */
    private static replaceRanges;
    private static parseRanges;
}
