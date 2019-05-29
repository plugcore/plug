import { IDiOnInit } from '../../dependecy-injection/di.interfaces';
import { ExtConfiguration } from './ext-configuration.interface';
export declare class ExtsConfigurationChecker implements IDiOnInit {
    scannedExts: ExtConfiguration[];
    primaryExt: ExtConfiguration;
    onInit(): Promise<void>;
    /**
     * Generates the extension configuration object and adds it to the
     * dependency injection container. All the properties have a default
     * value but can be overriden by properties defined in the
     * 'pcms-cfg/configuration.json' file in the extension directory
     * @param extBaseFolder
     */
    private generateExtensionConfiguration;
}
