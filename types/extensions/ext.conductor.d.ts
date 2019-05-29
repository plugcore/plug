import { Logger } from '../logs/logger.utils';
import { ExtsConfigurationChecker } from './configuration/exts-configuration.checker';
export declare class ExtConductor {
    private extCfgChecker;
    private logger;
    constructor(extCfgChecker: ExtsConfigurationChecker, logger: Logger);
    scan(): Promise<void>;
    private scanExt;
    private loadExts;
}
