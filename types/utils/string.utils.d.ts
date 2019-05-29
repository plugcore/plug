export declare class StringUtils {
    /**
     * Shows the sctring version of the given object with 2 levels
     * of properties depth, but it can be changed with the depth
     * parameter
     * @param inp
     * @param depth
     */
    static objToStr(inp: Object, depth?: number): string;
    /**
     * Returns a string with all the elements in the input array
     * separated by commas
     * @param inp
     */
    static arrayToString(inp: Object[]): String;
    /**
     * Replaces non ASCII characters
     * @param inp
     */
    static normalizeText(inp: string, toLowerCase?: boolean, replaceSpaces?: boolean): string;
    /**
     * Creates a random string id with A-z chars
     * @param length 7 by default
     */
    static createRandomId(length?: number): string;
    /**
     * Check if the string desn't exists or it has an empty value
     * @param inp
     */
    static isBlank(inp?: string): boolean;
}
