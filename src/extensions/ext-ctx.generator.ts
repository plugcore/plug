interface ExtFolder { id: string; path: string; length: number; }

export class ExtCtxGenerator {

	// -------------------------------------------------------------------------
	// Private variables
	// -------------------------------------------------------------------------

	private static extFolders: ExtFolder[] = [];

	// -------------------------------------------------------------------------
	// Public methods
	// -------------------------------------------------------------------------

	/**
	 * Registers a base extension folder and assigns it an id. These values are
	 * stored to be able to get the ext id given a folder path
	 * @param extId
	 * @param extFolder
	 */
	public static registerExtFolder(extId: string, extFolder: string) {
		this.extFolders.push({
			id: extId,
			path: extFolder,
			length: extFolder.length
		});
	}

	/**
	 * Looks into the extension folders and tries to find the best match.
	 * Default value: Container.globalCtx
	 * @param folderPath
	 */
	public static generateCtx(folderPath: string): string | undefined {

		
		let result;

		let maxLength = 0;
		this.extFolders.forEach(extFolder => {

			if (folderPath.startsWith(extFolder.path) && maxLength < extFolder.length) {
				result = extFolder.id;
				maxLength = extFolder.length;
			}
		});

		return result;
	}

}
