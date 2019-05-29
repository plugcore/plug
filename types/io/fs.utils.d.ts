/// <reference types="node" />
import { Stats } from 'fs';
export interface IFileStats {
    path: string;
    stats: Stats;
}
/**
 * File System utils
 */
export declare class FsUtils {
    /**
     * Returns a list with all the files inside that folder, it can search
     * recursively
     * @param folderPath
     * @param recursive
     * @param resultFiles
     */
    static getAllFilesFromFolder(folderPath: string, recursive?: boolean, resultFiles?: string[]): Promise<string[]>;
    /**
     * Converts a list of file paths to the stats
     * @param folderFiles
     */
    static getFilesStats(baseFolder: string, folderFiles: string[]): Promise<IFileStats>[];
    /**
     * Promise wrapper to readdir
     * @param folderPath
     */
    static getFolderFiles(folderPath: string): Promise<string[]>;
    /**
     * Promise wrapper to getStats
     * @param filePath
     */
    static getStats(filePath: string): Promise<Stats>;
    /**
     * Promise wrapper to readFile
     * @param filePath
     */
    static loadFile(filePath: string): Promise<string>;
    /**
     * Promise wrapper to prepare log.json file
     * @param filePath
     */
    static openLogFile(filePath: string): Promise<number>;
    static openNormalFile(filePath: string): Promise<number>;
    /**
     * Promise wrapper to write on specified
     * @param fileDescriptor
     * @param message
     * @param offset
     */
    static writeToFile(fileDescriptor: number, message: string, offset: number): Promise<string>;
    /**
     * Copy a folder with its content
     * @param source
     * @param target
     */
    static copyFolderRecursiveSync(source: string, target: string): void;
    /**
     * Copy a file
     * @param source
     * @param target
     */
    static copyFileSync(source: string, target: string): void;
    /**
     * Rename a file or a folder
     * @param source
     * @param name
     */
    static renameFileOrFolderSync(source: string, name: string): void;
    static removeDir(path: any, callback: any): any;
    static isJsFile(filePath: string): boolean;
    /**
     * Loads all the javascript files inside the folder and
     * returns an array with all the exports from each file
     * @param folderPath
     */
    static loadJsFolder(folderPath: string, recursive?: boolean): Promise<any[]>;
}
