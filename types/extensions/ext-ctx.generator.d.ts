export declare class ExtCtxGenerator {
    private static extFolders;
    /**
     * Registers a base extension folder and assigns it an id. These values are
     * stored to be able to get the ext id given a folder path
     * @param extId
     * @param extFolder
     */
    static registerExtFolder(extId: string, extFolder: string): void;
    /**
     * Looks into the extension folders and tries to find the best match.
     * Default value: Container.globalCtx
     * @param folderPath
     */
    static generateCtx(folderPath: string): string | undefined;
}
